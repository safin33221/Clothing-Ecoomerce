'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from '@/component/common/Icons';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingDiff = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#151515] border-l border-[#262522] text-[#F3EDE2] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#262522] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BagIcon className="w-5 h-5 text-[#C9A96E]" />
              <h2 className="text-lg font-medium tracking-wide">
                Your Bag <span className="text-[#9C968C] text-sm font-normal">({totalCount})</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#9C968C] hover:text-[#F3EDE2] transition-colors rounded-full hover:bg-[#222]"
              aria-label="Close cart"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#1B1A17] border-b border-[#262522]">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs text-[#C9A96E] font-medium tracking-wide">
                ✓ You have qualified for complimentary shipping!
              </p>
            ) : (
              <div>
                <p className="text-xs text-[#9C968C]">
                  Add <span className="text-[#F3EDE2] font-medium">${freeShippingDiff}</span> more for complimentary shipping.
                </p>
                <div className="mt-2 h-1 w-full bg-[#2A2926] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A96E] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-[#1F1E1B] flex items-center justify-center text-[#6B665E] mb-4">
                  <BagIcon className="w-7 h-7" />
                </div>
                <p className="text-xl font-serif text-[#F3EDE2]">Your bag is empty</p>
                <p className="text-sm text-[#9C968C] mt-2 max-w-xs">
                  Discover our new winter arrivals, heavyweight essentials, and tailoring.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-3 bg-[#F3EDE2] text-[#111111] text-xs uppercase tracking-widest font-semibold hover:bg-[#C9A96E] transition-colors rounded-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-6 border-b border-[#22211E] last:border-0"
                >
                  <div className="relative w-20 h-24 bg-[#1F1E1B] rounded-xs overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-[#F3EDE2] truncate pr-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm font-medium text-[#F3EDE2] shrink-0">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                      <p className="text-xs text-[#9C968C] mt-0.5 truncate">{item.product.detail}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-xs bg-[#242320] text-[#E2C99A] border border-[#33312B]">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#33312B] bg-[#1A1916] rounded-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                          className="p-1.5 text-[#9C968C] hover:text-[#F3EDE2] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs tabular-nums text-[#F3EDE2]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
                          className="p-1.5 text-[#9C968C] hover:text-[#F3EDE2] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-xs text-[#6B665E] hover:text-red-400 underline underline-offset-4 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals & checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#262522] bg-[#141412] space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#9C968C]">
                  <span>Subtotal</span>
                  <span className="text-[#F3EDE2] font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[#9C968C]">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-[#C9A96E]">Complimentary</span> : `$${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#222] flex justify-between text-base font-medium text-[#F3EDE2]">
                  <span>Total</span>
                  <span>${subtotal + shippingFee}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#d8b87d] text-[#111111] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-colors shadow-lg shadow-[#c9a96e]/10 cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-[11px] text-[#6B665E]">
                Complimentary returns within 60 days · Carbon neutral delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

