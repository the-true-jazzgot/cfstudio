const services = [
  "KREACJA VIDEO",
  "STRONY WWW",
  "PROJEKTOWANIE",
  "PRODUKT",
  "SOCIAL MEDIA",
  "FOTOGRAFIA",
  "BRANDING",
  "ABONAMENT",
];

export default function ServicesGrid() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 z-10 relative">
      {services.map((service, index) => (
        <div
          key={service}
          className={`p-10 text-center text-white ${
            index % 2 === 0 ? "bg-cyan-400" : "bg-cyan-300"
          }`}
        >
          <div className="text-4xl mb-4">□</div>
          <h3 className="text-sm tracking-[0.3em]">{service}</h3>
        </div>
      ))}
    </section>
  );
}