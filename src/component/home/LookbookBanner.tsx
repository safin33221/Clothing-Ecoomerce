'use client';

import React from 'react';
import { ArrowRightIcon } from '@/component/common/Icons';

export default function LookbookBanner() {
  const lookbookImage =
    'https://cdn.magicpatterns.com/patterns/generated-images/e9d1f77a-babc-4bc3-90cd-7f7100208aa3.jpg';

  const stats = [
    { title: 'Premium Quality', desc: 'Mill-sourced fabrics' },
    { title: 'Modern Style', desc: 'Cut in-house' },
    { title: 'Everyday Confidence', desc: '60-day returns' },
  ];

  return (
    <section id="lookbook" className="border-t border-[#2A2926]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[5fr_6fr] md:gap-16 md:px-10 md:py-28">
        {/* Left: Lookbook image */}
        <div className="overflow-hidden rounded-xs bg-[#171717]">
          <img
            src={lookbookImage}
            alt="Stello streetwear at night"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Right: Copy & Features */}
        <div className="max-w-lg">
          <p className="mb-5 text-xs tracking-[0.3em] text-[#C9A96E] uppercase font-medium">
            The Lookbook
          </p>

          <h2 className="font-serif text-5xl leading-[1.02] font-medium md:text-6xl text-[#F3EDE2]">
            After hours,{' '}
            <em className="font-normal italic text-[#E2C99A]">
              in the city.
            </em>
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-[#F3EDE2]/70 font-light">
            Heavyweight fleece, utility cargos and boots built for wet pavements. Twelve looks shot across London after dark — every piece available now.
          </p>

          <a
            href="#shop"
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#F3EDE2]/25 px-7 py-3.5 text-sm whitespace-nowrap text-[#F3EDE2] transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#E2C99A]"
          >
            Explore the lookbook
            <ArrowRightIcon className="h-4 w-4" />
          </a>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-[#2A2926] pt-8">
            {stats.map(({ title, desc }) => (
              <div key={title}>
                <dt className="font-serif text-base sm:text-lg leading-tight text-[#F3EDE2]">
                  {title}
                </dt>
                <dd className="mt-1.5 text-xs text-[#9C968C]">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
