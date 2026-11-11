'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Category, CategoryInfo, Product } from '@/types/product';
import { productService } from '@/services/productService';
import Navbar from '@/component/common/Navbar';
import CategoryTabs from '@/component/home/CategoryTabs';
import ProductGrid from '@/component/home/ProductGrid';
import { ChevronDownIcon } from '@/component/common/Icons';

type SortOption = 'Featured' | 'Price: low to high' | 'Price: high to low';

export default function ShopPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('Featured');

  useEffect(() => {
    async function initCategories() {
      const data = await productService.getCategories();
      setCategories(data);
    }
    initCategories();
  }, []);

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

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === 'Price: low to high') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'Price: high to low') {
      return list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, sortOption]);

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-[#F3EDE2]">
      {/* 1. Header / Navbar */}
      <Navbar current="shop" />

      {/* 2. Shop Hero & Category Tabs */}
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-8 md:px-10">
        <div className="text-center md:text-left mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-medium mb-2">
            The Complete Collection
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F3EDE2] font-medium tracking-tight">
            {activeCategory === 'All' ? 'All Pieces' : activeCategory}
          </h1>
        </div>

        {/* Floating Category Tabs & Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 border-b border-[#2A2926] pb-6 w-full max-w-full min-w-0 overflow-hidden">
          <div className="w-full md:w-auto max-w-full min-w-0 flex justify-center md:justify-start">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              className="md:mx-0"
            />
          </div>

          {/* Sort Controller */}
          <div className="flex items-center justify-between md:justify-end gap-3 self-center md:self-auto">
            <span className="text-xs uppercase tracking-wider text-[#9C968C]">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-[#161513] border border-[#2B2925] text-xs text-[#F3EDE2] rounded-full px-4 py-2 pr-8 focus:outline-hidden focus:border-[#C9A96E] cursor-pointer"
              >
                <option value="Featured">Featured</option>
                <option value="Price: low to high">Price: Low to High</option>
                <option value="Price: high to low">Price: High to Low</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9C968C] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Count Header */}
        <div className="pt-6 pb-8 flex items-center justify-between text-xs text-[#6B665E]">
          <span>
            Showing {sortedProducts.length}{' '}
            {sortedProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
          {activeCategory !== 'All' && (
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="text-[#C9A96E] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={sortedProducts}
          loading={loading}
          onOpenDetails={(prod) => router.push(`/product/${prod.id}`)}
        />
      </section>
    </div>
  );
}
