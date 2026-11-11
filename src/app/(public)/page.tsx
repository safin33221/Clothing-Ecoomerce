'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category, CategoryInfo, Product } from '@/types/product';
import { productService } from '@/services/productService';
import Navbar from '@/component/common/Navbar';
import CategoryTabs from '@/component/home/CategoryTabs';
import ProductGrid from '@/component/home/ProductGrid';
import LookbookBanner from '@/component/home/LookbookBanner';
import { ArrowRightIcon } from '@/component/common/Icons';

export default function HomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero background image of model in the Nocturne down puffer
  const heroImage =
    'https://cdn.magicpatterns.com/patterns/generated-images/225589c0-cdec-4ff0-aab1-823e62c7fcb7.jpg';

  // Load categories
  useEffect(() => {
    async function initCategories() {
      const data = await productService.getCategories();
      setCategories(data);
    }
    initCategories();
  }, []);

  // Load products based on category
  useEffect(() => {
    let isCancelled = false;
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await productService.getProducts(activeCategory);
        if (!isCancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      isCancelled = true;
    };
  }, [activeCategory]);

  const handleScrollToShop = () => {
    const el = document.getElementById('shop');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-full bg-[#111111] font-sans text-[#F3EDE2]">
      {/* 1. Top Announcement Bar */}
      <div className="border-b border-[#2A2926] bg-[#111111] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#9C968C] uppercase">
        Complimentary shipping on orders over $150
      </div>

      {/* 2. Hero Section with Non-Sticky, Transparent, Compact Navbar */}
      <section className="relative isolate overflow-hidden">
        {/* Model Background Image */}
        <img
          src={heroImage}
          alt="Model in the Nocturne down puffer"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/40 md:bg-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111] via-[#111111]/75 to-transparent hidden md:block" />

        {/* Non-Sticky, Transparent, Compact Navbar */}
        <Navbar
          current="home"
          onSelectCategory={(cat) => {
            setActiveCategory(cat as Category);
            handleScrollToShop();
          }}
          onOpenProduct={(prod) => router.push(`/product/${prod.id}`)}
        />

        {/* Hero Content */}
        <div className="mx-auto flex max-w-7xl flex-col justify-end px-5 pt-28 pb-24 md:min-h-[640px] md:justify-center md:px-10 md:pt-12 md:pb-32">
          <p className="mb-6 text-xs tracking-[0.3em] text-[#C9A96E] uppercase font-medium">
            WINTER COLLECTION ’25
          </p>

          <h1 className="max-w-xl font-serif text-6xl leading-[0.95] font-medium text-[#F3EDE2] sm:text-7xl lg:text-[104px] tracking-tight">
            Style that{' '}
            <em className="font-normal italic text-[#E2C99A]">
              speaks.
            </em>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F3EDE2]/70 font-light">
            Premium quality, modern style and everyday confidence — tailored outerwear and streetwear cut for the cold months ahead.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={handleScrollToShop}
              className="group inline-flex items-center gap-3 rounded-full bg-[#C9A96E] px-8 py-4 text-sm font-semibold whitespace-nowrap text-[#111111] transition-all duration-200 hover:bg-[#E2C99A] hover:shadow-[0_0_32px_-4px_rgba(226,201,154,0.55)] active:scale-[0.97] cursor-pointer"
            >
              <span>Shop Your Style</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </button>

            <a
              href="#lookbook"
              className="border-b border-[#F3EDE2]/30 pb-1 text-sm whitespace-nowrap text-[#F3EDE2]/80 transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#E2C99A]"
            >
              View the lookbook
            </a>
          </div>
        </div>
      </section>

      {/* 3. Sticky Floating Category Capsule Bar (Sticks at top while scrolling products) */}
      <div className="sticky top-5 z-40 -mt-6 px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
          />
        </div>
      </div>

      {/* 4. Catalog Section ("The Winter Edit") */}
      <section
        id="shop"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-16 pb-24 md:px-10"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl font-medium md:text-5xl text-[#F3EDE2]">
              {activeCategory === 'All' ? 'The Winter Edit' : activeCategory}
            </h2>
            <p className="mt-2 text-sm text-[#9C968C]">
              {loading ? 'Loading pieces…' : `${products.length} pieces`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              handleScrollToShop();
            }}
            className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap text-[#C9A96E] transition-colors duration-150 hover:text-[#E2C99A] cursor-pointer"
          >
            <span>View all</span>
            <span className="text-xs">↗</span>
          </button>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          onOpenDetails={(prod) => router.push(`/product/${prod.id}`)}
        />
      </section>

      {/* 5. Lookbook Editorial Section */}
      <LookbookBanner />
    </div>
  );
}
