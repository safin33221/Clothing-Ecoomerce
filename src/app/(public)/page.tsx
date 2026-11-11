'use client';

import React, { useEffect, useState } from 'react';
import { Category, CategoryInfo, Product } from '@/types/product';
import { productService } from '@/services/productService';
import Hero from '@/component/home/Hero';
import CategoryTabs from '@/component/home/CategoryTabs';
import ProductGrid from '@/component/home/ProductGrid';
import LookbookBanner from '@/component/home/LookbookBanner';
import ProductModal from '@/component/home/ProductModal';

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);

  // Load categories on mount
  useEffect(() => {
    async function initCategories() {
      const data = await productService.getCategories();
      setCategories(data);
    }
    initCategories();
  }, []);

  // Load products whenever activeCategory changes
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Main Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
        {/* Category Navigation & Dynamic Description */}
        <div className="mb-10">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            productCount={products.length}
          />
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          onOpenDetails={(prod) => setInspectProduct(prod)}
        />

        {/* Editorial Feature Banner */}
        <LookbookBanner />
      </section>

      {/* Quick View / Detail Modal */}
      <ProductModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
      />
    </div>
  );
}
