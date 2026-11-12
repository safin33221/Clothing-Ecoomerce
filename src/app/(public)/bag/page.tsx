'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from '@/component/common/Navbar';
import {
  CloseIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  ArrowRightIcon,
} from '@/component/common/Icons';

export default function BagPage() {
  const router = useRouter();
  const {
    cart,
    totalCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const freeShippingDiff = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      alert(`Promo code "${promoCode}" received.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-[#F3EDE2]">
      {/* 1. Transparent Header / Navbar */}
      <Navbar current="bag" />

      {/* 2. Main Bag Section */}
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-24 md:px-10 md:pt-16">
        {/* Title */}
        <h1 className="font-serif text-5xl font-medium md:text-6xl text-[#F3EDE2] tracking-tight">
          Your bag{' '}
          {totalCount > 0 && (
            <span className="font-sans text-base font-normal text-[#9C968C]">
              ({totalCount})
            </span>
          )}
        </h1>

        {cart.length === 0 ? (
          <div className="mt-16 max-w-md">
            <p className="font-serif text-3xl text-[#F3EDE2]/90">Nothing here yet.</p>
            <p className="mt-3 text-[15px] text-[#9C968C] font-light leading-relaxed">
              The winter edit is in — outerwear, knits and heavyweight essentials.
            </p>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C9A96E] px-8 py-4 text-sm font-semibold text-[#111111] transition-all duration-200 hover:bg-[#E2C99A] hover:shadow-[0_0_32px_-4px_rgba(226,201,154,0.55)] cursor-pointer"
            >
              <span>Shop Your Style</span>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            {/* Left Column: Cart items list */}
            <div>
              {/* Shipping Notification Bar */}
              <p className="border-b border-[#2A2926] pb-4 text-sm text-[#9C968C]">
                {isFreeShipping ? (
                  <span>You’ve unlocked complimentary shipping.</span>
                ) : (
                  <span>
                    Add{' '}
                    <span className="text-[#E2C99A] font-medium">
                      ${freeShippingDiff}
                    </span>{' '}
                    more for complimentary shipping.
                  </span>
                )}
              </p>

              {/* Items List */}
              <ul className="divide-y divide-[#2A2926]">
                {cart.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-5 py-6"
                  >
                    {/* Thumbnail */}
                    <button
                      type="button"
                      onClick={() => router.push(`/product/${item.product.id}`)}
                      className="w-24 sm:w-32 shrink-0 overflow-hidden rounded-xs bg-[#171717] border border-[#242320] cursor-pointer"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </button>

                    {/* Meta & Adjusters */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2
                            onClick={() => router.push(`/product/${item.product.id}`)}
                            className="text-[15px] font-medium text-[#F3EDE2] hover:text-[#E2C99A] transition-colors cursor-pointer"
                          >
                            {item.product.name}
                          </h2>
                          <p className="mt-1 text-xs text-[#9C968C]">
                            {item.product.detail}
                          </p>
                          <p className="mt-1 text-xs text-[#9C968C]">
                            Size {item.size}
                          </p>
                        </div>

                        <p className="font-serif text-xl font-semibold whitespace-nowrap text-[#E2C99A]">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        {/* Rounded Quantity Pill */}
                        <div className="flex items-center rounded-full border border-[#2A2926] bg-[#141412]">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, -1)
                            }
                            className="grid h-9 w-9 place-items-center text-[#9C968C] hover:text-[#F3EDE2] transition-colors cursor-pointer"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums text-[#F3EDE2] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, 1)
                            }
                            className="grid h-9 w-9 place-items-center text-[#9C968C] hover:text-[#F3EDE2] transition-colors cursor-pointer"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.size)
                          }
                          className="inline-flex items-center gap-1.5 text-xs text-[#6B665E] hover:text-[#E2C99A] transition-colors cursor-pointer"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Continue Shopping Link */}
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-[#9C968C] hover:text-[#E2C99A] transition-colors"
                >
                  <span className="text-[#C9A96E] font-bold">|</span>
                  <span>Continue shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div>
              <div className="rounded-xs border border-[#2A2926] bg-[#141412] p-6 sm:p-7 space-y-6">
                <h2 className="font-serif text-2xl font-medium text-[#F3EDE2]">
                  Order summary
                </h2>

                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#9C968C]">Subtotal</dt>
                    <dd className="font-medium text-[#F3EDE2]">${subtotal}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#9C968C]">Shipping</dt>
                    <dd>
                      {shippingFee === 0 ? (
                        <span className="text-[#C9A96E]">Complimentary</span>
                      ) : (
                        `$${shippingFee}`
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#9C968C]">Taxes</dt>
                    <dd className="text-[#9C968C]">Calculated at checkout</dd>
                  </div>
                </dl>

                {/* Total */}
                <div className="flex items-baseline justify-between border-t border-[#2A2926] pt-6">
                  <span className="text-sm text-[#F3EDE2]">Total</span>
                  <span className="font-serif text-3xl font-semibold text-[#E2C99A]">
                    ${subtotal + shippingFee}
                  </span>
                </div>

                {/* Secure Checkout Button */}
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      'Ready for checkout gateway integration (Stripe, SSLCommerz, PayPal, etc.).'
                    )
                  }
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A96E] py-4 text-sm font-semibold text-[#111111] transition-all duration-200 hover:bg-[#E2C99A] hover:shadow-[0_0_32px_-4px_rgba(226,201,154,0.55)] active:scale-[0.98] cursor-pointer"
                >
                  <LockIcon className="h-3.5 w-3.5" />
                  <span>Secure checkout</span>
                </button>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="mt-6 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="min-w-0 flex-1 rounded-full border border-[#2A2926] bg-transparent px-4 py-2.5 text-sm text-[#F3EDE2] placeholder:text-[#6B665E] focus:border-[#C9A96E] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-[#2A2926] px-4 py-2 text-sm text-[#F3EDE2] transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#E2C99A] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="mt-2 text-xs text-[#C9A96E]">
                    Promo code applied successfully.
                  </p>
                )}

                {/* Disclaimers */}
                <p className="mt-6 text-xs leading-relaxed text-[#6B665E]">
                  Free returns within 60 days. Delivered in 2–4 working days.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
