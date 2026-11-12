'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { CloseIcon, SearchIcon } from './Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      productService.getProducts('All').then((data) => {
        setAllProducts(data);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.detail.toLowerCase().includes(lower)
    );
  }, [query, allProducts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative min-h-screen px-4 pt-20 pb-12 flex justify-center">
        <div className="w-full max-w-2xl bg-[#141412] border border-[#2B2925] rounded-xs shadow-2xl overflow-hidden self-start">
          {/* Search Input Bar */}
          <div className="flex items-center px-6 py-4 border-b border-[#242320]">
            <SearchIcon className="w-5 h-5 text-[#C9A96E] shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search garments, knitwear, outerwear..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-base text-[#F3EDE2] placeholder-[#6B665E] focus:outline-hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs uppercase tracking-wider text-[#6B665E] hover:text-[#9C968C] mr-3"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-[#9C968C] hover:text-[#F3EDE2] rounded-full hover:bg-[#222] transition-colors"
              aria-label="Close search"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions or Results */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {!query.trim() ? (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B665E] font-medium mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Down Puffer', 'Wool Overcoat', 'Boxy Tee', 'Overshirt', 'Merino Knit'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-[#1C1B18] border border-[#2B2925] text-xs text-[#9C968C] hover:text-[#F3EDE2] hover:border-[#C9A96E] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-[#9C968C]">
                <p className="font-serif text-lg text-[#F3EDE2]">No garments found</p>
                <p className="text-xs text-[#6B665E] mt-1">
                  Try searching for keywords like &ldquo;wool&rdquo;, &ldquo;jacket&rdquo;, or &ldquo;cotton&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B665E] font-medium mb-2">
                  Found {results.length} {results.length === 1 ? 'piece' : 'pieces'}
                </p>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      handleClose();
                      onSelectProduct?.(product);
                    }}
                    className="flex items-center gap-4 p-2 rounded-xs hover:bg-[#1E1D1A] transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-15 bg-[#1F1E1B] rounded-xs overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#F3EDE2] group-hover:text-[#C9A96E] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#9C968C] truncate">{product.detail}</p>
                    </div>
                    <span className="text-xs font-medium text-[#F3EDE2] shrink-0">
                      ${product.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

