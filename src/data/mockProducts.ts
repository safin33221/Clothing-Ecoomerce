import { CategoryInfo, Product, ProductSize } from '@/types/product';

export const ALL_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'All',
    description: 'Every piece in the current collection — outerwear, knitwear, shirting and heavyweight essentials.',
  },
  {
    name: 'Winter',
    description: 'Wool, merino and cashmere-blend layers built for the coldest months.',
  },
  {
    name: 'T-Shirts',
    description: 'Heavyweight cotton tees, cut boxy and garment-dyed for a lived-in finish.',
  },
  {
    name: 'Full Sleeve Shirts',
    description: 'Oxfords, overshirts and twills to wear alone or layer under a coat.',
  },
  {
    name: 'Jackets',
    description: 'Down, suede and technical shells — the pieces that finish an outfit.',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nocturne Down Puffer',
    detail: 'Matte nylon · 700-fill down',
    category: 'Jackets',
    price: 289,
    tag: 'New',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/ee0c2e16-ea18-4d8c-93a6-7c1b78467178.jpg',
    description:
      'A clean-lined down puffer in a matte, water-repellent shell. Box-quilted baffles, a stowaway hood and storm cuffs keep the cold out without the bulk.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p2',
    name: 'Atelier Wool Overcoat',
    detail: 'Italian wool blend · Charcoal',
    category: 'Winter',
    price: 340,
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/4868ecee-a165-4c2e-83d8-24cf091515e5.jpg',
    description:
      'Our signature single-breasted overcoat in an Italian wool blend. Notch lapels, a half canvas and a fully lined body that drapes cleanly over tailoring or knitwear.',
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p3',
    name: 'Heavyweight Boxy Tee',
    detail: '280gsm cotton · Bone',
    category: 'T-Shirts',
    price: 58,
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/d4b309ef-87d3-46ff-a8d4-737220af6488.jpg',
    description:
      'A dense 280gsm cotton jersey cut boxy through the body, with a tight ribbed collar that holds its shape wash after wash.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p4',
    name: 'Brushed Twill Overshirt',
    detail: 'Cotton twill · Olive',
    category: 'Full Sleeve Shirts',
    price: 124,
    tag: 'New',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/ea171b21-23d8-4572-a0dc-98f98948a3b0.jpg',
    description:
      'A brushed cotton twill overshirt with twin flap pockets. Heavy enough to layer as a light jacket, soft enough to wear as a shirt.',
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p5',
    name: 'Suede Flight Bomber',
    detail: 'Goat suede · Tobacco',
    category: 'Jackets',
    price: 420,
    was: 495,
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/d594c2f6-b7c1-4667-8232-3a66fb92c390.jpg',
    description:
      'A flight bomber in soft goat suede, finished with chocolate rib trims and a horn-button chest pocket. Gets better with every wear.',
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p6',
    name: 'Signature Oversized Tee',
    detail: '260gsm cotton · Onyx',
    category: 'T-Shirts',
    price: 54,
    tag: 'Low stock',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/396d8c2d-0474-42b7-a8da-12ea95d4f1ea.jpg',
    description:
      'Oversized through the shoulder with a dropped sleeve. 260gsm cotton, garment-dyed to a deep onyx with a tonal embroidered mark.',
    availableSizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 'p7',
    name: 'Crisp Oxford Shirt',
    detail: 'Egyptian cotton · White',
    category: 'Full Sleeve Shirts',
    price: 98,
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/efdc1c40-6809-495c-92ca-8d8e4ec8f3be.jpg',
    description:
      'A crisp oxford shirt in long-staple Egyptian cotton with a button-down collar and a single chest pocket. The everyday essential, done properly.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p8',
    name: 'Fisherman Cable Knit',
    detail: 'Merino wool · Ecru',
    category: 'Winter',
    price: 165,
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/c5e2d485-2090-452f-b4b6-333ac9209cbc.jpg',
    description:
      'A fisherman cable knit in extra-fine merino. Traditional Aran stitching, a relaxed fit and ribbed trims for a classic winter layer.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

