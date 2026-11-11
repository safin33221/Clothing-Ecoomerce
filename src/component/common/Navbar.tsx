'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { BagIcon, CloseIcon, SearchIcon, UserIcon } from './Icons';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export default function Navbar({ onSelectCategory, activeCategory }: NavbarProps) {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', value: 'All' },
    { label: 'Winter', value: 'Winter' },
    { label: 'T-Shirts', value: 'T-Shirts' },
    { label: 'Jackets', value: 'Jackets' },
    { label: 'Lookbook', href: '#lookbook' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111111]/90 backdrop-blur-md border-b border-[#242320] transition-colors">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-18 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9C968C] hover:text-[#F3EDE2] focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-serif tracking-[0.25em] uppercase font-bold text-[#F3EDE2] hover:text-[#C9A96E] transition-colors"
          >
            STELLO
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.18em]">
          {navLinks.map((link) => {
            if (link.value && onSelectCategory) {
              const isActive = activeCategory === link.value;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => onSelectCategory(link.value)}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#C9A96E] font-medium'
                      : 'text-[#9C968C] hover:text-[#F3EDE2]'
                  }`}
                >
                  {link.label}
                </button>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href || '#'}
                className="text-[#9C968C] hover:text-[#F3EDE2] transition-colors duration-200"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 md:space-x-6 text-sm">
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 text-[#9C968C] hover:text-[#C9A96E] transition-colors p-1"
            title="Search"
            aria-label="Search"
          >
            <SearchIcon className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest hidden lg:inline">Search</span>
          </button>

          <button
            type="button"
            className="hidden sm:flex items-center gap-2 text-[#9C968C] hover:text-[#C9A96E] transition-colors p-1"
            title="Account"
            aria-label="Account"
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest hidden lg:inline">Account</span>
          </button>

          {/* Bag button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1D1C19] border border-[#2E2C27] hover:border-[#C9A96E]/50 text-[#F3EDE2] transition-colors cursor-pointer group"
            aria-label="View shopping bag"
          >
            <BagIcon className="w-4 h-4 text-[#C9A96E] group-hover:scale-105 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-medium">Bag</span>
            <span className="text-xs px-1.5 py-0.2 rounded-full bg-[#C9A96E] text-[#111111] font-semibold tabular-nums">
              {totalCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#242320] bg-[#141412] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-[0.2em]">
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
                className="text-left text-[#9C968C] hover:text-[#C9A96E] py-1 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#242320] flex items-center justify-between text-xs text-[#9C968C]">
            <span className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" /> My Account
            </span>
            <span className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" /> Search Catalog
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
