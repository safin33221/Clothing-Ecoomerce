'use client';

import React, { useState } from 'react';
import { Product, ProductSize } from '@/types/product';
import { ALL_SIZES } from '@/data/mockProducts';
import { useCart } from '@/context/CartContext';
import { BagIcon, CheckIcon, CloseIcon } from '@/component/common/Icons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'fit' | 'fabric' | 'shipping'>('fit');

  if (!product) return null;

  const isAvailable = (size: ProductSize) => {
    if (!product.availableSizes) return true;
    return product.availableSizes.includes(size);
  };

  const handleAdd = () => {
    if (!isAvailable(selectedSize)) return;
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-4xl bg-[#141412] border border-[#2B2925] rounded-xs text-left shadow-2xl overflow-hidden my-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#9C968C] hover:text-[#F3EDE2] rounded-full bg-[#1C1B18]/80 hover:bg-[#2A2926] transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-[#1A1917] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-[#C9A96E] text-[#111111] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xs">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Details & Purchase */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium">
                  {product.category}
                </span>

                <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#F3EDE2] font-medium">
                  {product.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-xl font-medium text-[#F3EDE2]">
                    ${product.price}
                  </span>
                  {product.was && (
                    <span className="text-sm text-[#6B665E] line-through">
                      ${product.was}
                    </span>
                  )}
                  <span className="text-xs text-[#9C968C]">
                    Tax included · Free shipping over $150
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#9C968C] leading-relaxed font-light">
                  {product.description || product.detail}
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="uppercase tracking-wider text-[#F3EDE2] font-medium">
                    Select Size: <span className="text-[#C9A96E]">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('fit')}
                    className="text-[#9C968C] hover:text-[#C9A96E] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {ALL_SIZES.map((size) => {
                    const available = isAvailable(size);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!available}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs uppercase font-medium rounded-xs border transition-all cursor-pointer ${
                          !available
                            ? 'opacity-30 border-[#222] text-[#555] cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#F3EDE2] text-[#111111] border-[#F3EDE2] font-semibold'
                            : 'bg-[#1A1916] text-[#F3EDE2] border-[#2A2926] hover:border-[#C9A96E]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Bag Action */}
              <div>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!isAvailable(selectedSize)}
                  className={`w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C9A96E] hover:bg-[#E2C99A] text-[#111111]'
                  }`}
                >
                  {added ? (
                    <>
                      <CheckIcon className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <BagIcon className="w-4 h-4" /> Add to Bag · ${product.price}
                    </>
                  )}
                </button>
              </div>

              {/* Accordion / Tabs */}
              <div className="border-t border-[#242320] pt-4">
                <div className="flex border-b border-[#242320] text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('fit')}
                    className={`pb-2 mr-4 transition-colors ${
                      activeTab === 'fit'
                        ? 'text-[#C9A96E] border-b-2 border-[#C9A96E] font-medium'
                        : 'text-[#6B665E] hover:text-[#9C968C]'
                    }`}
                  >
                    Fit & Sizing
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2 mr-4 transition-colors ${
                      activeTab === 'fabric'
                        ? 'text-[#C9A96E] border-b-2 border-[#C9A96E] font-medium'
                        : 'text-[#6B665E] hover:text-[#9C968C]'
                    }`}
                  >
                    Fabric & Care
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'text-[#C9A96E] border-b-2 border-[#C9A96E] font-medium'
                        : 'text-[#6B665E] hover:text-[#9C968C]'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#9C968C] leading-relaxed">
                  {activeTab === 'fit' && (
                    <p>True to size with a relaxed, modern silhouette. Model is 6’1” (185cm) and wears a size Medium.</p>
                  )}
                  {activeTab === 'fabric' && (
                    <p>{product.detail}. Dry clean recommended or delicate cold wash inside out; reshape and dry flat.</p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>Complimentary standard shipping on all orders over $150 (delivered in 2–4 business days). Free 60-day returns worldwide.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

