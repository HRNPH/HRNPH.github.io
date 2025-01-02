import FFT from "fft.js";

/**
 * Class for performing frequency-based lip sync analysis on audio data.
 * @param smoothing - Smoothing factor for energy normalization.
 * @param sensitivityThreshold - Sensitivity threshold for energy normalization.
 * @param vocalTractLengthFactor - Factor for adjusting vocal tract length.
 * @param sampleCount - Number of samples to use for FFT.
 * @param boundingFrequencies - Array of bounding frequencies for energy calculation.
 * @returns Array of normalized bin energies.
 * @example
 * const lipSync = new FrequencyBasedLipSync();
 * const audioBuffer = new Float32Array(1024);
 * const sampleRate = 44100;
 * const normalizedBinEnergy = lipSync.analyze(audioBuffer, sampleRate);
 * console.log(normalizedBinEnergy);
 */
class FrequencyBasedLipSync {
    private smoothing: number;
    private sensitivityThreshold: number;
    private vocalTractLengthFactor: number;
    private sampleCount: number;
    private boundingFrequencies: number[];
    private frequencyDataIndices: number[];
    private binEnergy: number[];

    constructor(
        smoothing = 0.39,
        sensitivityThreshold = 0.43,
        vocalTractLengthFactor = 1.21,
        sampleCount = 1024,
        boundingFrequencies = [0, 500, 700, 3000, 6000]
    ) {
        this.smoothing = smoothing;
        this.sensitivityThreshold = sensitivityThreshold;
        this.vocalTractLengthFactor = vocalTractLengthFactor;
        this.sampleCount = sampleCount;
        this.boundingFrequencies = boundingFrequencies.map(f => f * vocalTractLengthFactor);
        this.frequencyDataIndices = Array(boundingFrequencies.length).fill(0);
        this.binEnergy = Array(boundingFrequencies.length - 1).fill(0);
    }

    private calculateFrequencyIndices(sampleRate: number): void {
        this.frequencyDataIndices = this.boundingFrequencies.map(frequency => {
            return Math.floor((2 * this.sampleCount * frequency) / sampleRate);
        });
    }

    public analyze(audioBuffer: Float32Array, sampleRate: number): number[] {
        // Calculate frequency indices based on the sample rate
        this.calculateFrequencyIndices(sampleRate);

        // Perform FFT (using a library like fft.js or similar)
        const f = new FFT(this.sampleCount);
        const spectrum = f.createComplexArray();
        f.realTransform(spectrum, audioBuffer);

        // Calculate energy for each bin
        this.binEnergy.fill(0);
        for (let i = 0; i < this.binEnergy.length; i++) {
            const indexStart = this.frequencyDataIndices[i];
            const indexEnd = this.frequencyDataIndices[i + 1];
            const binLength = indexEnd - indexStart;

            for (let j = indexStart; j < indexEnd; j++) {
                this.binEnergy[i] += spectrum[j] > 0 ? spectrum[j] : 0;
            }

            this.binEnergy[i] /= binLength;
        }

        // Normalize bin energies based on sensitivity threshold
        const normalizedBinEnergy = this.binEnergy.map(energy => {
            return this.sensitivityThreshold + (20 * Math.log10(energy + 1e-6) + 20) / 140;
        });

        return normalizedBinEnergy;
    }
}

export default FrequencyBasedLipSync;