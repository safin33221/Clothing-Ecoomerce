'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { BagIcon, CloseIcon, SearchIcon, UserIcon } from './Icons';
import SearchModal from './SearchModal';
import { Product } from '@/types/product';

interface NavbarProps {
  current?: string;
  onSelectCategory?: (category: string) => void;
  onOpenProduct?: (product: Product) => void;
}

export default function Navbar({
  current = 'home',
  onSelectCategory,
  onOpenProduct,
}: NavbarProps) {
  const { totalCount, setSelectedProduct } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'New In', value: 'Winter' },
    { label: 'Shop', value: 'All' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Journal', href: '#lookbook' },
  ];

  const handleSelectFromSearch = (product: Product) => {
    if (onOpenProduct) {
      onOpenProduct(product);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      {/* Non-sticky, completely transparent and sleek compact header */}
      <header className="relative z-20 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-3.5">
          {/* Mobile Menu Icon */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F3EDE2] md:hidden cursor-pointer p-1"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl font-medium tracking-[0.32em] text-[#E2C99A] hover:text-[#C9A96E] transition-colors"
          >
            STELLO
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 text-[13px] md:flex">
            {navLinks.map((link) => {
              if (link.value && onSelectCategory) {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => onSelectCategory(link.value)}
                    className="whitespace-nowrap transition-colors duration-150 text-[#F3EDE2]/80 hover:text-[#E2C99A] cursor-pointer"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href || '#'}
                  className="whitespace-nowrap transition-colors duration-150 text-[#F3EDE2]/80 hover:text-[#E2C99A]"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons: Search, Account, Bag (links directly to /bag) */}
          <div className="flex items-center gap-4 text-[#F3EDE2]/90">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="transition-colors duration-150 hover:text-[#E2C99A] p-1 cursor-pointer"
            >
              <SearchIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label="Account"
              onClick={() => alert('Account authentication ready for integration.')}
              className="hidden transition-colors duration-150 hover:text-[#E2C99A] sm:block p-1 cursor-pointer"
            >
              <UserIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            {/* Bag Icon linking directly to dedicated /bag page */}
            <Link
              href="/bag"
              aria-label="Shopping bag"
              className="relative transition-colors duration-150 hover:text-[#E2C99A] p-1 cursor-pointer group"
            >
              <BagIcon className="h-5 w-5" strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C9A96E] px-1 text-[10px] font-semibold text-[#111111] tabular-nums">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#2A2926] bg-[#141412]/95 backdrop-blur-xl px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2.5 text-xs uppercase tracking-[0.2em]">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    if (link.value && onSelectCategory) {
                      onSelectCategory(link.value);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-[#9C968C] hover:text-[#E2C99A] py-1 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#2A2926] flex items-center justify-between text-xs text-[#9C968C]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-2 hover:text-[#E2C99A]"
              >
                <SearchIcon className="w-4 h-4" /> Search
              </button>
              <Link
                href="/bag"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 hover:text-[#E2C99A]"
              >
                <BagIcon className="w-4 h-4" /> Bag ({totalCount})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectFromSearch}
      />
    </>
  );
}
