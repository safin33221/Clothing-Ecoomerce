'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { BagIcon } from '@/component/common/Icons';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default size is 'M' or first available size
    const defaultSize = product.availableSizes?.[0] || 'M';
    addToCart(product, defaultSize, 1);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group flex flex-col cursor-pointer transition-transform duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-[#191816] border border-[#242320] group-hover:border-[#3D3A34] transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xs shadow-sm ${
                product.tag === 'New'
                  ? 'bg-[#C9A96E] text-[#111111]'
                  : product.tag === 'Low stock'
                  ? 'bg-[#2B2925] text-[#E2C99A] border border-[#3E3B35]'
                  : 'bg-red-900/80 text-white'
              }`}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#F3EDE2] text-[#111111] hover:bg-[#C9A96E] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-lg flex items-center justify-center gap-1.5"
          >
            <BagIcon className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="p-2.5 bg-[#1F1E1B]/90 hover:bg-[#2A2926] text-[#F3EDE2] rounded-xs border border-[#3A3833] transition-colors text-xs"
            title="Inspect piece"
          >
            Details
          </button>
        </div>
      </div>

      {/* Product Meta */}
      <div className="mt-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-[#F3EDE2] group-hover:text-[#C9A96E] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 shrink-0">
            {product.was && (
              <span className="text-xs text-[#6B665E] line-through">
                ${product.was}
              </span>
            )}
            <span className="text-sm font-medium text-[#F3EDE2]">
              ${product.price}
            </span>
          </div>
        </div>

        <p className="mt-1 text-xs text-[#9C968C] line-clamp-1 font-light">
          {product.detail}
        </p>

        <span className="mt-2 text-[10px] uppercase tracking-widest text-[#6B665E]">
          {product.category}
        </span>
      </div>
    </div>
  );
}

