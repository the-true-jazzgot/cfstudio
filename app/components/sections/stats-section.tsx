export default function StatsSection() {
  return (
    <section className="relative bg-cyan-400 text-white py-28">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-4xl mx-auto flex justify-around text-center">
        <div>
          <h3 className="text-6xl font-bold">80</h3>
          <p className="uppercase tracking-widest">Customer Services</p>
        </div>

        <div>
          <h3 className="text-6xl font-bold">263</h3>
          <p className="uppercase tracking-widest">Company Members</p>
        </div>
      </div>
    </section>
  );
}