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
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col animate-pulse">
            <div className="aspect-[4/5] w-full bg-[#1C1B19] rounded-xs" />
            <div className="mt-4 h-4 bg-[#23221E] w-3/4 rounded-xs" />
            <div className="mt-2 h-3 bg-[#1F1E1B] w-1/2 rounded-xs" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl font-serif text-[#F3EDE2]">No garments found</p>
        <p className="text-sm text-[#9C968C] mt-2">
          There are currently no pieces available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
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

