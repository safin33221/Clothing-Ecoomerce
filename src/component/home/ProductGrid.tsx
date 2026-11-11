'use client';

import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onOpenDetails: (product: Product) => void;
}

export default function ProductGrid({
  products,
  loading = false,
  onOpenDetails,
}: ProductGridProps) {
  const gridClasses = 'grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4';

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col animate-pulse">
            <div className="aspect-[4/5] rounded-xs bg-[#1E1E1E]" />
            <div className="mt-4 h-4 w-3/4 rounded-xs bg-[#1E1E1E]" />
            <div className="mt-2 h-3 w-1/2 rounded-xs bg-[#1E1E1E]" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-xl text-[#F3EDE2]">No garments found</p>
        <p className="mt-2 text-sm text-[#9C968C]">
          There are currently no pieces available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
