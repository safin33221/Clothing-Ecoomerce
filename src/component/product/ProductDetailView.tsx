'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, ProductSize } from '@/types/product';
import { useCart } from '@/context/CartContext';
import Navbar from '@/component/common/Navbar';
import ProductCard from '@/component/home/ProductCard';
import {
  CheckIcon,
  ChevronDownIcon,
  HeartIcon,
  RulerIcon,
} from '@/component/common/Icons';
import { ALL_SIZES } from '@/data/mockProducts';
import SizeGuideModal from './SizeGuideModal';

// Object position slices for the 3 gallery angles from bundle
const THUMB_POSITIONS = ['center', '50% 25%', '50% 75%'];

// Out-of-stock sizes per product from design
const OUT_OF_STOCK: Record<string, ProductSize[]> = {
  p1: ['XS'],
  p5: ['XS', 'XXL'],
  p6: ['S', 'M'],
};

const ACCORDIONS = [
  {
    title: 'Fit & sizing',
    content:
      'True to size with a relaxed fit. Model is 6’1” (185cm) and wears a size M.',
  },
  {
    title: 'Fabric & care',
    content:
      'See the label for composition. Dry clean or cold wash inside out; reshape and dry flat.',
  },
  {
    title: 'Shipping & returns',
    content:
      'Complimentary shipping over $150, delivered in 2–4 working days. Free returns within 60 days.',
  },
];

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const outOfStockSizes = OUT_OF_STOCK[product.id] || [];
  const firstAvailable =
    ALL_SIZES.find((s) => !outOfStockSizes.includes(s)) || 'M';

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    firstAvailable
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, 1);
    setAdded(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-[#F3EDE2]">
      {/* 1. Header / Navbar */}
      <Navbar current="product" />

      {/* 2. Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-10">
        <nav className="text-xs text-[#6B665E] flex items-center">
          <Link href="/" className="transition-colors duration-150 hover:text-[#F3EDE2]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/" className="transition-colors duration-150 hover:text-[#F3EDE2]">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#9C968C] truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* 3. Main Product Section (2-Column Grid) */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-8 pb-20 md:px-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
        {/* Left Column: Gallery (Thumbnails + Main Image) */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          {/* Thumbnails strip */}
          <div className="flex gap-3 sm:flex-col shrink-0">
            {THUMB_POSITIONS.map((pos, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveThumb(idx)}
                aria-label={`View angle ${idx + 1}`}
                className={`w-16 sm:w-20 overflow-hidden rounded-xs border transition-colors duration-150 cursor-pointer ${
                  activeThumb === idx
                    ? 'border-[#C9A96E]'
                    : 'border-[#2A2926] hover:border-[#F3EDE2]/40'
                }`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                  style={{
                    objectPosition: pos,
                    transform: idx ? 'scale(1.8)' : undefined,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Large Main Display */}
          <div className="group relative flex-1 overflow-hidden rounded-xs bg-[#171717] border border-[#242320]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              style={{
                objectPosition: THUMB_POSITIONS[activeThumb],
                transform: activeThumb ? 'scale(1.8)' : undefined,
              }}
            />
            {product.tag && (
              <span className="absolute top-4 left-4 rounded-full bg-[#F3EDE2] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#111111] uppercase shadow-sm">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Meta, Sizing, Actions & Accordions (Sticky) */}
        <div className="lg:sticky lg:top-12 lg:self-start space-y-6">
          <div>
            <p className="text-xs tracking-[0.25em] text-[#C9A96E] uppercase font-medium">
              {product.category}
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl text-[#F3EDE2]">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-[#E2C99A]">
                ${product.price}
              </span>
              {product.was && (
                <span className="text-sm text-[#6B665E] line-through">
                  ${product.was}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-[#9C968C]">{product.detail}</p>
          </div>

          {/* Size Selector */}
          <div className="pt-4 border-t border-[#2A2926]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#F3EDE2]">
                Size
                {selectedSize && (
                  <span className="ml-2 font-normal text-[#9C968C]">
                    {selectedSize}
                  </span>
                )}
              </p>

              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#9C968C] transition-colors duration-150 hover:text-[#E2C99A] cursor-pointer"
              >
                <RulerIcon className="h-3.5 w-3.5" />
                <span>Size guide</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-6 gap-2">
              {ALL_SIZES.map((size) => {
                const isOutOfStock = outOfStockSizes.includes(size);
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                      setAdded(false);
                    }}
                    className={`rounded-xs border py-3 text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                      isOutOfStock
                        ? 'cursor-not-allowed border-[#22211E] text-[#4A4843] line-through'
                        : isSelected
                        ? 'border-[#C9A96E] bg-[#C9A96E] text-[#111111] font-semibold shadow-sm'
                        : 'border-[#2A2926] text-[#F3EDE2] hover:border-[#F3EDE2]/50'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p role="alert" className="mt-3 text-xs text-[#E2C99A]">
                Choose a size to add this to your bag.
              </p>
            )}
          </div>

          {/* Add to Bag and Wishlist buttons */}
          <div className="pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="relative flex-1 overflow-hidden rounded-full bg-[#C9A96E] py-4 text-sm font-semibold text-[#111111] transition-all duration-200 hover:bg-[#E2C99A] hover:shadow-[0_0_32px_-4px_rgba(226,201,154,0.55)] active:scale-[0.98] cursor-pointer"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {added ? (
                    <>
                      <CheckIcon className="h-4 w-4" /> Added to bag
                    </>
                  ) : (
                    'Add to bag'
                  )}
                </span>
              </button>

              <button
                type="button"
                aria-label="Save to Wishlist"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border transition-colors duration-150 cursor-pointer ${
                  isWishlisted
                    ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]'
                    : 'border-[#2A2926] text-[#F3EDE2] hover:border-[#C9A96E] hover:text-[#E2C99A]'
                }`}
              >
                <HeartIcon
                  className="h-4 w-4"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {added && (
              <button
                type="button"
                onClick={() => router.push('/bag')}
                className="mt-3 w-full rounded-full border border-[#F3EDE2]/25 py-3.5 text-sm text-[#F3EDE2] transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#E2C99A] cursor-pointer"
              >
                View bag & check out
              </button>
            )}
          </div>

          {/* Product Description */}
          <p className="pt-4 text-[15px] leading-relaxed text-[#F3EDE2]/70 font-light border-t border-[#2A2926]">
            {product.description ||
              'A dense 280gsm cotton jersey cut boxy through the body, with a tight ribbed collar that holds its shape wash after wash.'}
          </p>

          {/* Accordions */}
          <div className="border-t border-[#2A2926]">
            {ACCORDIONS.map(({ title, content }) => (
              <details key={title} className="group border-b border-[#2A2926]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm text-[#F3EDE2] hover:text-[#E2C99A] transition-colors">
                  <span>{title}</span>
                  <ChevronDownIcon className="h-4 w-4 text-[#9C968C] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-[#9C968C]">
                  {content}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Complete the look" Section */}
      <section className="border-t border-[#2A2926]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <h2 className="mb-10 font-serif text-4xl font-medium text-[#F3EDE2]">
            Complete the look
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onOpenDetails={(p) => router.push(`/product/${p.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={(s) => {
          setSelectedSize(s);
          setSizeError(false);
          setAdded(false);
        }}
        selectedSize={selectedSize}
        categoryName={product.category}
      />
    </div>
  );
}

