import WaifuDisplayer from "@/components/live2d/WaifuDisplayer";

export default function Home() {
  return (
    <div className="container">
      <div className="h-screen">
        <div className="text-center my-4">
          <h1 className="font-bold text-4xl">Hirunkul Phimsiri</h1>
        </div>
        <WaifuDisplayer
          className="absolute top-0 right-0 h-screen w-2/6"
          modelOptions={{
            model: "/models/SakiUnit/02saki_unit.model3.json",
            position: {
              x: 0.4,
              y: 0.4,
            },
            scale: {
              x: 0.5,
              y: 0.5,
            },
            alpha: 0,
          }}
        />
      </div>
    </div>
  );
}
