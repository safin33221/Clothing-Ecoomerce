'use client';

import React from 'react';
import { ArrowRightIcon } from '@/component/common/Icons';

interface HeroProps {
  onShopClick?: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const handleScrollToShop = () => {
    if (onShopClick) {
      onShopClick();
      return;
    }
    const el = document.getElementById('shop');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate overflow-hidden min-h-[580px] sm:min-h-[660px] md:min-h-[740px] flex items-center">
      {/* Background Image of model in Nocturne down puffer */}
      <img
        src="https://cdn.magicpatterns.com/patterns/generated-images/225589c0-cdec-4ff0-aab1-823e62c7fcb7.jpg"
        alt="Model in the Nocturne down puffer"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />

      {/* Dark gradient overlay matching the reference screenshot */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-black/30 md:via-[#111111]/60 md:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#111111] via-transparent to-transparent md:hidden" />

      {/* Hero Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pt-28 pb-20 md:px-10 md:pt-16 md:pb-24">
        {/* Collection Tag */}
        <p className="mb-6 text-xs tracking-[0.3em] text-[#C9A96E] uppercase font-medium">
          WINTER COLLECTION ’25
        </p>

        {/* Display Headline */}
        <h1 className="max-w-xl font-serif text-6xl leading-[0.95] font-medium text-[#F3EDE2] sm:text-7xl lg:text-[100px] tracking-tight">
          Style that{' '}
          <em className="block font-normal italic text-[#E2C99A]">
            speaks.
          </em>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F3EDE2]/70 font-light">
          Premium quality, modern style and everyday confidence — tailored outerwear and streetwear cut for the cold months ahead.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={handleScrollToShop}
            className="group inline-flex items-center gap-3 rounded-full bg-[#C9A96E] px-8 py-4 text-sm font-semibold whitespace-nowrap text-[#111111] transition-all duration-200 hover:bg-[#E2C99A] hover:shadow-[0_0_32px_-4px_rgba(226,201,154,0.55)] active:scale-[0.97] cursor-pointer"
          >
            <span>Shop Your Style</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </button>

          <a
            href="#lookbook"
            className="border-b border-[#F3EDE2]/30 pb-1 text-sm whitespace-nowrap text-[#F3EDE2]/80 transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#E2C99A]"
          >
            View the lookbook
          </a>
        </div>
      </div>
    </section>
  );
}
