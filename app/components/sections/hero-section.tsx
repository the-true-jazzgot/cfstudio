export default function HeroSection() {
  return (
    <section className="bg-cyan-400">
      <div className="h-[500px] flex items-center justify-center">
        <h2 className="text-7xl font-bold text-gray-700">CFS</h2>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="bg-cyan-400 text-white flex items-center px-16 py-24">
          <div>
            <h3 className="text-4xl font-light">KREATYWNE</h3>
            <h3 className="text-5xl font-bold">ROZWIĄZANIA</h3>
            <h3 className="text-4xl font-light">DLA BIZNESU</h3>
          </div>
        </div>

        <div
          className="min-h-[350px] bg-cover bg-center"
          style={{ backgroundImage: "url('/creative.jpg')" }}
        />
      </div>
    </section>
  );
}