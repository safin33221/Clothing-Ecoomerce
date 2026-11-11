import React from 'react';
import Footer from '@/component/common/Footer';
import CartDrawer from '@/component/cart/CartDrawer';
import GlobalProductModal from '@/component/common/GlobalProductModal';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-[#F3EDE2] selection:bg-[#C9A96E] selection:text-[#111111]">
      <CartDrawer />
      <GlobalProductModal />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
