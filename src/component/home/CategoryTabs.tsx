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
      className={`${className} flex w-fit max-w-full overflow-x-auto rounded-full border border-[#C9A96E]/20 bg-[#141412]/90 p-1.5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl [scrollbar-width:none]`}
    >
      {categories.map((cat) => {
        const isActive = cat.name === activeCategory;
        return (
          <button
            key={cat.name}
            type="button"
            onClick={() => onSelectCategory(cat.name)}
            aria-pressed={isActive}
            className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-200 sm:px-5 cursor-pointer ${
              isActive
                ? 'bg-[#C9A96E] text-[#111111] shadow-[0_0_18px_-2px_rgba(201,169,110,0.6)] font-semibold'
                : 'text-[#F3EDE2]/75 hover:text-[#F3EDE2]'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </nav>
  );
}
