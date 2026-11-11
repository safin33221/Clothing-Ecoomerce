'use client';

import React from 'react';
import { ArrowRightIcon } from '@/component/common/Icons';

export default function LookbookBanner() {
  return (
    <section id="lookbook" className="my-20 relative overflow-hidden rounded-xs border border-[#242320] bg-[#141412]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Column: Image with overlay */}
        <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] w-full overflow-hidden">
          <img
            src="https://cdn.magicpatterns.com/patterns/generated-images/4868ecee-a165-4c2e-83d8-24cf091515e5.jpg"
            alt="Stello Lookbook Editorial"
            className="w-full h-full object-cover object-top filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#141412]/40 to-[#141412]" />
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium">
            Editorial Feature · Vol. IV
          </span>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F3EDE2] leading-tight">
            After hours, <em className="font-normal italic text-[#E2C99A]">style that speaks.</em>
          </h2>

          <p className="mt-4 text-sm text-[#9C968C] leading-relaxed font-light">
            Designed for transitioning effortlessly between evening appointments and low-lit cityscapes. Heavyweight Italian wools, relaxed drop shoulders, and brushed metal hardware.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A96E] text-[#111111] hover:bg-[#E2C99A] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs transition-colors cursor-pointer"
            >
              Explore Collection
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

