"use client";

type TrustedByContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  schools: string[];
};

export default function TrustedBy({ content }: { content?: TrustedByContent }) {
  const schools = content?.schools ?? [];
  // Duplicate list more times for smoother infinite loop
  const items = [...schools, ...schools, ...schools, ...schools];

  return (
    <section className="bg-white py-12 overflow-hidden border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-6 mb-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold tracking-widest text-slate-500 mb-4 uppercase">
          {content?.eyebrow ?? "TRUSTED PARTNERS"}
        </span>
        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
          {content?.title ?? "Geng Juara Kita"} 🏆
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-4">
          {items.map((name, idx) => (
            <div
              key={`${name}-${idx}`}
              className="inline-flex items-center gap-3 rounded-full border-2 border-slate-100 bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 hover:border-ferrari hover:shadow-ferrari/20 mx-2"
            >
              <div className="h-8 w-8 rounded-full bg-linear-to-tr from-ferrari to-acid flex items-center justify-center text-white font-bold text-xs shrink-0">
                FJ
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-4 ml-4">
           {items.map((name, idx) => (
            <div
              key={`${name}-${idx}-clone`}
              className="inline-flex items-center gap-3 rounded-full border-2 border-slate-100 bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 hover:border-ferrari hover:shadow-ferrari/20 mx-2"
            >
              <div className="h-8 w-8 rounded-full bg-linear-to-tr from-ferrari to-acid flex items-center justify-center text-white font-bold text-xs shrink-0">
                FJ
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}