import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { Category } from '@/types/product';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as Category | null;

  if (category && category !== 'All') {
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === category);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(MOCK_PRODUCTS);
}

