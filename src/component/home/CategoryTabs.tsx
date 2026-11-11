'use client';

import React from 'react';
import { Category, CategoryInfo } from '@/types/product';

interface CategoryTabsProps {
  categories: CategoryInfo[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  productCount: number;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
  productCount,
}: CategoryTabsProps) {
  const currentCategoryInfo = categories.find((c) => c.name === activeCategory);

  return (
    <div className="w-full">
      {/* Pills list */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2">
        {categories.map((cat) => {
          const isActive = cat.name === activeCategory;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#C9A96E] text-[#111111] font-semibold shadow-md shadow-[#C9A96E]/10'
                  : 'bg-[#181715] text-[#9C968C] hover:text-[#F3EDE2] border border-[#2B2925] hover:border-[#3D3A34]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Dynamic description & count */}
      {currentCategoryInfo && (
        <div className="mt-6 flex flex-col md:flex-row items-baseline justify-between gap-3 text-center md:text-left border-b border-[#201F1C] pb-6">
          <p className="text-sm text-[#9C968C] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            {currentCategoryInfo.description}
          </p>
          <span className="text-xs uppercase tracking-widest text-[#6B665E] whitespace-nowrap mx-auto md:mx-0">
            Showing {productCount} {productCount === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      )}
    </div>
  );
}

