'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import ProductModal from '@/component/home/ProductModal';

export default function GlobalProductModal() {
  const { selectedProduct, setSelectedProduct } = useCart();

  if (!selectedProduct) return null;

  return (
    <ProductModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  );
}

