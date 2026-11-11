'use client';

import React, { useState } from 'react';
import { ProductSize } from '@/types/product';
import { CloseIcon, RulerIcon } from '@/component/common/Icons';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: ProductSize) => void;
  selectedSize?: ProductSize | null;
  categoryName?: string;
}

interface MeasurementRow {
  size: ProductSize;
  chestIn: string;
  chestCm: string;
  shoulderIn: string;
  shoulderCm: string;
  lengthIn: string;
  lengthCm: string;
  sleeveIn: string;
  sleeveCm: string;
}

const MEASUREMENTS: MeasurementRow[] = [
  { size: 'XS', chestIn: '36"', chestCm: '91 cm', shoulderIn: '17.5"', shoulderCm: '44 cm', lengthIn: '27"', lengthCm: '68 cm', sleeveIn: '32.5"', sleeveCm: '82 cm' },
  { size: 'S',  chestIn: '38"', chestCm: '96 cm', shoulderIn: '18"',   shoulderCm: '46 cm', lengthIn: '27.5"', lengthCm: '70 cm', sleeveIn: '33.5"', sleeveCm: '85 cm' },
  { size: 'M',  chestIn: '40"', chestCm: '102 cm', shoulderIn: '18.5"', shoulderCm: '47 cm', lengthIn: '28"', lengthCm: '71 cm', sleeveIn: '34.5"', sleeveCm: '87 cm' },
  { size: 'L',  chestIn: '43"', chestCm: '109 cm', shoulderIn: '19.5"', shoulderCm: '49 cm', lengthIn: '29"', lengthCm: '74 cm', sleeveIn: '35.5"', sleeveCm: '90 cm' },
  { size: 'XL', chestIn: '46"', chestCm: '117 cm', shoulderIn: '20.5"', shoulderCm: '52 cm', lengthIn: '30"', lengthCm: '76 cm', sleeveIn: '36.5"', sleeveCm: '93 cm' },
  { size: 'XXL', chestIn: '49"', chestCm: '124 cm', shoulderIn: '21.5"', shoulderCm: '54 cm', lengthIn: '30.5"', lengthCm: '77 cm', sleeveIn: '37.5"', sleeveCm: '95 cm' },
];

export default function SizeGuideModal({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize,
  categoryName = 'Apparel',
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-2xl bg-[#141412] border border-[#2B2925] rounded-xs text-left shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-[#242320]">
            <div>
              <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-[0.2em] font-medium mb-1">
                <RulerIcon className="w-4 h-4" />
                <span>Size & Fit Guide</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F3EDE2]">
                {categoryName} Measurements
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#9C968C] hover:text-[#F3EDE2] rounded-full hover:bg-[#222] transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Description */}
          <div className="flex items-center justify-between py-4">
            <p className="text-xs text-[#9C968C]">
              Select a size row to apply it directly to your selection.
            </p>

            <div className="inline-flex rounded-full border border-[#2B2925] bg-[#1A1916] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  unit === 'in'
                    ? 'bg-[#C9A96E] text-[#111111]'
                    : 'text-[#9C968C] hover:text-[#F3EDE2]'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  unit === 'cm'
                    ? 'bg-[#C9A96E] text-[#111111]'
                    : 'text-[#9C968C] hover:text-[#F3EDE2]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xs border border-[#242320] bg-[#111111]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#242320] bg-[#181715] text-[#9C968C] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Size</th>
                  <th className="py-3 px-4 font-semibold">Chest</th>
                  <th className="py-3 px-4 font-semibold">Shoulder</th>
                  <th className="py-3 px-4 font-semibold">Body Length</th>
                  <th className="py-3 px-4 font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1E1B]">
                {MEASUREMENTS.map((row) => {
                  const isCurrent = selectedSize === row.size;
                  return (
                    <tr
                      key={row.size}
                      onClick={() => {
                        onSelectSize?.(row.size);
                        onClose();
                      }}
                      className={`transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#C9A96E]/15 text-[#E2C99A]'
                          : 'hover:bg-[#1A1916] text-[#F3EDE2]'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold flex items-center gap-1.5">
                        <span className={isCurrent ? 'text-[#C9A96E]' : ''}>
                          {row.size}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-[#C9A96E] font-normal">
                            (Selected)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        {unit === 'in' ? row.chestIn : row.chestCm}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        {unit === 'in' ? row.shoulderIn : row.shoulderCm}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        {unit === 'in' ? row.lengthIn : row.lengthCm}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        {unit === 'in' ? row.sleeveIn : row.sleeveCm}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* How to Measure Note */}
          <div className="mt-6 rounded-xs bg-[#171614] border border-[#262420] p-4 text-xs space-y-2">
            <p className="font-semibold text-[#F3EDE2] uppercase tracking-wider text-[11px]">
              How to Measure
            </p>
            <ul className="space-y-1.5 text-[#9C968C] list-disc list-inside">
              <li>
                <strong className="text-[#F3EDE2] font-medium">Chest:</strong> Measure around the fullest part of your chest, keeping the tape level under your arms.
              </li>
              <li>
                <strong className="text-[#F3EDE2] font-medium">Shoulder:</strong> Measure across the upper curve of your back, from one shoulder seam point to the other.
              </li>
              <li>
                <strong className="text-[#F3EDE2] font-medium">Fit Advice:</strong> Stello garments feature intentional, relaxed silhouettes. Choose your usual size for an effortless drape, or size down for a slimmer tailored cut.
              </li>
            </ul>
          </div>

          {/* Footer action */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#C9A96E] hover:bg-[#E2C99A] text-[#111111] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

