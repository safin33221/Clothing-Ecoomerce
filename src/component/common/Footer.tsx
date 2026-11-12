'use client';

import React from 'react';
import { ArrowRightIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0C] border-t border-[#22211E] text-[#9C968C] text-xs">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12">
        {/* Top Section: Newsletter and Brand pitch */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#1E1D1A]">
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-serif tracking-[0.2em] uppercase text-[#F3EDE2] font-semibold">
              STELLO
            </h3>
            <p className="text-sm text-[#9C968C] max-w-sm leading-relaxed">
              Quiet luxury outerwear, knitwear, and tailoring built for longevity. Every piece is cut from premium European fabrics and crafted to endure.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#F3EDE2] font-medium mb-2">
                Join the Journal
              </p>
              <p className="text-xs text-[#9C968C] mb-4">
                Receive private previews of limited edition drops and seasonal lookbooks.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Stello Journal.');
              }}
              className="flex max-w-md w-full"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-[#161513] border border-[#2B2925] px-4 py-3 text-xs text-[#F3EDE2] placeholder-[#6B665E] focus:outline-hidden focus:border-[#C9A96E] rounded-l-xs"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#C9A96E] text-[#111111] hover:bg-[#E2C99A] transition-colors rounded-r-xs flex items-center justify-center font-medium cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#1E1D1A]">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F3EDE2] font-semibold mb-4">
              Collection
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Outerwear & Down</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Merino Knitwear</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Boxy Heavyweight Tees</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Oxford Overshirts</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Curated Lookbook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F3EDE2] font-semibold mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Complimentary Shipping ($150+)</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Returns & Exchanges (60 Days)</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Size & Fit Consultation</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Garment Care Instructions</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F3EDE2] font-semibold mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Our Design Philosophy</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Responsible Sourcing</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Italian Mill Partners</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Press & Editorial</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F3EDE2] font-semibold mb-4">
              Flagship Stores
            </h4>
            <p className="leading-relaxed text-[#6B665E] mb-3">
              Visit our spaces for bespoke fittings and tailoring appointments.
            </p>
            <p className="text-[#9C968C]">London · New York · Tokyo · Paris</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#6B665E]">
          <p>© 2025 Stello. Style that speaks. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px]">
            <a href="#" className="hover:text-[#F3EDE2] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F3EDE2] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F3EDE2] transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
