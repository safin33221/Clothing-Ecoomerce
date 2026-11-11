import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16 border-b border-[#22211E]">
      {/* Background glow / ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-radial from-[#C9A96E]/8 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1B18] border border-[#2D2B26] text-[#C9A96E] text-[11px] uppercase tracking-[0.2em] font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          The Winter 2025 Capsule
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F3EDE2] max-w-4xl mx-auto leading-[1.08]">
          Style that <em className="font-normal italic text-[#E2C99A]">speaks.</em>
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#9C968C] max-w-2xl mx-auto font-light leading-relaxed">
          Uncompromising fabrications, generous silhouettes, and precise tailoring. Built in limited batches for those who appreciate understated luxury.
        </p>

        {/* Value props banner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B665E] tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A96E]">✦</span> 700-Fill Down & Italian Wool
          </span>
          <span className="hidden sm:inline text-[#2A2926]">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A96E]">✦</span> Complimentary Global Shipping ($150+)
          </span>
          <span className="hidden sm:inline text-[#2A2926]">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A96E]">✦</span> 60-Day Return Window
          </span>
        </div>
      </div>
    </section>
  );
}

