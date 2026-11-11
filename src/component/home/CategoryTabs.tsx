'use client';

import React from 'react';
import { Category, CategoryInfo } from '@/types/product';

interface CategoryTabsProps {
  categories: CategoryInfo[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  className?: string;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
  className = 'mx-auto',
}: CategoryTabsProps) {
  return (
    <nav
      aria-label="Shop by category"
      className={`${className} flex w-fit max-w-[calc(100vw-24px)] sm:max-w-full min-w-0 overflow-x-auto rounded-full border border-[#C9A96E]/20 bg-[#141412]/95 p-1 sm:p-1.5 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.85)] backdrop-blur-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {categories.map((cat) => {
          const isActive = cat.name === activeCategory;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              aria-pressed={isActive}
              className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 sm:px-4.5 sm:py-2 sm:text-[13px] cursor-pointer ${
                isActive
                  ? 'bg-[#C9A96E] text-[#111111] shadow-[0_0_14px_-2px_rgba(201,169,110,0.6)] font-semibold'
                  : 'text-[#F3EDE2]/75 hover:text-[#F3EDE2]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
