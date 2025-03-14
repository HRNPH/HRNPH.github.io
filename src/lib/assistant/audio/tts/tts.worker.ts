import { KokoroTTS } from "kokoro-js";
import { detectWebGPU } from "@/lib/assistant/audio/tts/tts.utils";
import { phonemize } from "./tts.phonemizer";
import {
  StyleTextToSpeech2Model,
  AutoTokenizer,
  Tensor,
  RawAudio,
} from "@huggingface/transformers";
import { getVoiceData } from "./tts.voices";
// Device detection
const device = (await detectWebGPU()) ? "webgpu" : "wasm";
self.postMessage({ status: "device", device });

// Load the model
const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";

const tts = await (async () => {
  try {
    const model = StyleTextToSpeech2Model.from_pretrained(model_id, {
      progress_callback: (info) => {
        self.postMessage({ status: "loading", info: info });
        console.log({ status: "loading.tts-model", info });
      },
      dtype: device === "wasm" ? "q8" : "fp32",
      device: device,
      local_files_only: false,
    });
    const tokenizer = AutoTokenizer.from_pretrained(model_id, {
      progress_callback: (info) => {
        console.log({ status: "loading.tokenizer", info });
      },
    });

    const info = await Promise.all([model, tokenizer]);
    return new KokoroTTS(...info);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    self.postMessage({ status: "error", error: errorMessage });
    throw e;
  }
})();

self.postMessage({ status: "ready", voices: tts.voices, device });

// Listen for messages from the main thread
self.addEventListener("message", async (e) => {
  const { type } = e.data;
  console.debug({
    state: "tts",
    type: type,
    data: e.data,
  });
  switch (type) {
    case "generate":
      // Generate speech
      const { text, voice } = e.data;

      const language = tts._validate_voice(voice);
      const phonemes = await phonemize(text, language);
      const { input_ids } = await tts.tokenizer(phonemes, { truncation: true });
      console.debug("Phonemes", phonemes);

      // Select voice style based on number of input tokens
      const num_tokens = Math.min(Math.max(input_ids.dims.at(-1) - 2, 0), 509);

      // Load voice style
      const STYLE_DIM = 256;
      const SAMPLE_RATE = 24000;
      const SPEED = 1.1;

      const data = await getVoiceData(voice);
      const offset = num_tokens * STYLE_DIM;
      const voiceData = data.slice(offset, offset + STYLE_DIM);

      // Prepare model inputs
      const inputs = {
        input_ids,
        style: new Tensor("float32", voiceData, [1, STYLE_DIM]),
        speed: new Tensor("float32", [SPEED], [1]),
      };

      // Generate audio
      const { waveform } = await tts.model(inputs);
      const audio = new RawAudio(waveform.data, SAMPLE_RATE).toBlob();

      // Send the audio file back to the main thread
      self.postMessage({ status: "audio", audio: audio, text: text });
      break;
    default:
      console.error("Unknown message type", e.data);
  }
});
