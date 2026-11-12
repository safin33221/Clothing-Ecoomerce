'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { PlusIcon } from '@/component/common/Icons';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.availableSizes?.[0] || 'M';
    addToCart(product, defaultSize, 1);
  };

  return (
    <article
      onClick={() => onOpenDetails(product)}
      className="group flex flex-col cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative block overflow-hidden rounded-xs bg-[#171717] border border-[#242320]">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />

        {/* Tag Pill */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
              product.tag === 'New'
                ? 'bg-[#F3EDE2] text-[#111111]'
                : 'bg-[#111111]/80 text-[#E2C99A] border border-[#2A2926]'
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Circular Add to Bag / Quick Add Button */}
        <button
          type="button"
          aria-label={`Add ${product.name} to bag`}
          onClick={handleQuickAdd}
          className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-[#F3EDE2] text-[#111111] opacity-100 transition-all duration-200 hover:bg-[#C9A96E] active:scale-95 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 shadow-md cursor-pointer"
        >
          <PlusIcon className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Product Meta */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-sm font-medium text-[#F3EDE2] group-hover:text-[#E2C99A] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-[#9C968C]">{product.detail}</p>

        <p className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-serif text-xl font-semibold text-[#E2C99A]">
            ${product.price}
          </span>
          {product.was && (
            <span className="text-xs text-[#6B665E] line-through">
              ${product.was}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
