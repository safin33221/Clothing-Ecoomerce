import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { productService } from '@/services/productService';
import ProductDetailView from '@/component/product/ProductDetailView';

// Pre-render static pages for all mock products
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productService.getProductById(id);
  if (!product) {
    return { title: 'Product Not Found | STELLO' };
  }
  return {
    title: `${product.name} | STELLO`,
    description: product.description || product.detail,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  const all = await productService.getProducts('All');
  const relatedProducts = all
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category)
    )
    .slice(0, 4);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111111]" />}>
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
      />
    </Suspense>
  );
}
