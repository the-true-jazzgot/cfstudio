const items = Array.from({ length: 8 });

export default function PortfolioGallery() {
  return (
    <section className="py-20 z-10 relative">
      <h2 className="text-center text-4xl font-light mb-14">
        ZOBACZ NASZE NAJNOWSZE PROJEKTY
      </h2>

      <div className="grid md:grid-cols-4 gap-2 px-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </section>
  );
}