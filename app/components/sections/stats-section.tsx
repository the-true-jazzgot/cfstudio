import { client } from "@/sanity/lib/client";
import AnimatedCounter from "./animated-counter";

interface StatItem {
  _key?: string;
  value: number;
  label: string;
}

interface StatsDocument {
  items?: StatItem[];
}

const fallbackStats: StatItem[] = [
  {
    value: 80,
    label: "Customer Services",
  },
  {
    value: 263,
    label: "Company Members",
  },
];

export default async function StatsSection() {
  const stats = await client.fetch<StatsDocument>(
    `*[_type == "stats"][0]{
      items[]{
        _key,
        value,
        label
      }
    }`
  );
  const items = stats?.items?.length ? stats.items : fallbackStats;

  return (
    <section className="relative bg-cyan-400 text-white py-28">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 text-center md:flex md:items-start md:justify-around">
        {items.map((item, index) => (
          <div key={item._key || `${item.label}-${index}`} className="min-w-0">
            <h3 className="text-5xl font-bold md:text-6xl">
              <AnimatedCounter value={item.value} />
            </h3>
            <p className="mt-3 text-xs uppercase tracking-widest md:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
