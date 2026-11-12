# AGENTS.md — Master Backend Engineering Specification
**Project:** STELLO E-Commerce Backend Service  
**Architecture:** NestJS + PostgreSQL + Prisma ORM + Redis + JWT Auth + Stripe  
**Target Client:** Next.js 16 Storefront (`src/services/productService.ts`)

---

## 1. Executive Summary & Purpose
This document serves as the single source of truth for AI coding agents and backend engineers implementing the production backend for **STELLO**, a minimalist quiet luxury menswear e-commerce platform.

The backend must:
1. Provide robust **JWT Authentication** (Access + Refresh Tokens in HttpOnly Cookies, Role-Based Access Control: `CUSTOMER`, `ADMIN`).
2. Serve the **Product Catalog & Sizing** data matching the frontend's exact schema (`src/types/product.ts`).
3. Handle **Orders, Stock Reservation, and Checkout** with atomic database transactions.
4. Support **Promotions / Promo Codes** (integrated with the frontend bag page).
5. Integrate **Stripe Payments** (Payment Intents & Webhooks).
6. Provide **Swagger / OpenAPI** documentation at `/api/docs`.

---

## 2. Technology Stack & Core Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Framework** | Node.js (v20+ LTS) + NestJS 11+ | Modular enterprise architecture |
| **Language** | TypeScript (Strict Mode) | Full end-to-end type safety |
| **Database** | PostgreSQL 16+ | Relational data integrity & ACID transactions |
| **ORM** | Prisma ORM (v6+) | Type-safe queries, migrations & relations |
| **Caching & Queues** | Redis + BullMQ | Session caching & asynchronous jobs (emails, cleanup) |
| **Authentication** | Passport-JWT, Argon2, HttpOnly Cookies | Stateless auth with secure token rotation |
| **Payments** | Stripe Node SDK | Secure card processing & Webhook events |
| **Validation** | `class-validator` + `class-transformer` | Strict runtime DTO request validation |
| **Documentation** | `@nestjs/swagger` + `swagger-ui-express` | Automated OpenAPI documentation |

---

## 3. Database Schema (`prisma/schema.prisma`)

Agents must initialize Prisma with the following schema:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CUSTOMER
  ADMIN
  SUPER_ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

enum ProductSize {
  XS
  S
  M
  L
  XL
  XXL
}

enum ProductTag {
  NEW
  LOW_STOCK
  SALE
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String
  name          String?
  phone         String?
  role          Role           @default(CUSTOMER)
  isActive      Boolean        @default(true)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  refreshTokens RefreshToken[]
  addresses     Address[]
  orders        Order[]
  wishlist      WishlistItem[]

  @@map("users")
}

model RefreshToken {
  id        String   @id @default(uuid())
  tokenHash String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  isRevoked Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("refresh_tokens")
}

model Address {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  recipient    String
  street       String
  city         String
  state        String?
  postalCode   String
  country      String
  isDefault    Boolean  @default(false)
  createdAt    DateTime @default(now())

  @@map("addresses")
}

model Category {
  id          String    @id @default(uuid())
  name        String    @unique
  slug        String    @unique
  description String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products    Product[]

  @@map("categories")
}

model Product {
  id          String         @id @default(uuid())
  name        String
  slug        String         @unique
  detail      String         // e.g. "Matte nylon · 700-fill down"
  description String         @db.Text
  price       Decimal        @db.Decimal(10, 2)
  wasPrice    Decimal?       @db.Decimal(10, 2)
  tag         ProductTag?
  image       String         // Primary showcase image URL
  categoryId  String
  category    Category       @relation(fields: [categoryId], references: [id])
  isPublished Boolean        @default(true)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  images      ProductImage[]
  variants    ProductVariant[]
  orderItems  OrderItem[]
  wishlist    WishlistItem[]

  @@map("products")
}

model ProductImage {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  order     Int      @default(0)

  @@map("product_images")
}

model ProductVariant {
  id            String      @id @default(uuid())
  productId     String
  product       Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  size          ProductSize
  stockQuantity Int         @default(0)
  sku           String      @unique

  @@unique([productId, size])
  @@map("product_variants")
}

model Order {
  id              String        @id @default(uuid())
  orderNumber     String        @unique // e.g. "STL-2026-0001"
  userId          String?
  user            User?         @relation(fields: [userId], references: [id], onDelete: SetNull)
  guestEmail      String?
  status          OrderStatus   @default(PENDING)
  paymentStatus   PaymentStatus @default(PENDING)
  paymentIntentId String?       @unique

  subtotal        Decimal       @db.Decimal(10, 2)
  shippingFee     Decimal       @db.Decimal(10, 2) // $0 if subtotal >= 150, else $12
  discountAmount  Decimal       @default(0.00) @db.Decimal(10, 2)
  total           Decimal       @db.Decimal(10, 2)

  couponId        String?
  coupon          Coupon?       @relation(fields: [couponId], references: [id])

  shippingAddress Json          // Snapshot of delivery address
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  items           OrderItem[]

  @@map("orders")
}

model OrderItem {
  id        String      @id @default(uuid())
  orderId   String
  order     Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product     @relation(fields: [productId], references: [id])
  size      ProductSize
  quantity  Int
  unitPrice Decimal     @db.Decimal(10, 2)
  total     Decimal     @db.Decimal(10, 2)

  @@map("order_items")
}

model Coupon {
  id            String       @id @default(uuid())
  code          String       @unique // e.g. "WINTER10"
  discountType  DiscountType
  value         Decimal      @db.Decimal(10, 2) // percentage (e.g. 15.00) or fixed ($20.00)
  minSpend      Decimal?     @db.Decimal(10, 2)
  maxDiscount   Decimal?     @db.Decimal(10, 2)
  expiresAt     DateTime?
  usageLimit    Int?
  usedCount     Int          @default(0)
  isActive      Boolean      @default(true)
  createdAt     DateTime     @default(now())

  orders        Order[]

  @@map("coupons")
}

model WishlistItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
  @@map("wishlist_items")
}
```

---

## 4. NestJS Directory Structure

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── constants/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   ├── all-exceptions.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── optional-jwt.guard.ts
│   │   ├── interceptors/
│   │   │   ├── transform-response.interceptor.ts
│   │   │   └── logging.interceptor.ts
│   │   └── dto/
│   │       └── pagination.dto.ts
│   ├── config/
│   │   └── configuration.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── modules/
│       ├── auth/
│       │   ├── dto/
│       │   ├── strategies/ (jwt.strategy.ts, refresh-token.strategy.ts)
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── auth.module.ts
│       ├── users/
│       │   ├── users.controller.ts
│       │   ├── users.service.ts
│       │   └── users.module.ts
│       ├── products/
│       │   ├── dto/
│       │   ├── products.controller.ts
│       │   ├── products.service.ts
│       │   └── products.module.ts
│       ├── categories/
│       │   ├── categories.controller.ts
│       │   ├── categories.service.ts
│       │   └── categories.module.ts
│       ├── orders/
│       │   ├── dto/
│       │   ├── orders.controller.ts
│       │   ├── orders.service.ts
│       │   └── orders.module.ts
│       ├── payments/
│       │   ├── payments.controller.ts
│       │   ├── payments.service.ts
│       │   └── payments.module.ts
│       ├── coupons/
│       │   ├── coupons.controller.ts
│       │   ├── coupons.service.ts
│       │   └── coupons.module.ts
│       └── mail/
│           ├── mail.service.ts
│           └── mail.module.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── test/
├── docker-compose.yml
├── .env.example
├── tsconfig.json
└── package.json
```

---

## 5. API Endpoints Specification

All endpoints are prefixed with `/api`. Responses should adhere to standard JSON wrapper:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

### 5.1 Authentication (`/api/auth`)
- `POST /api/auth/register` — Creates user (`email`, `password`, `name`). Returns user info + sets HttpOnly refreshToken cookie.
- `POST /api/auth/login` — Verifies password via Argon2. Returns access token (15m expiry) + sets HttpOnly refreshToken cookie (7d).
- `POST /api/auth/refresh` — Rotates refresh token and returns new access token.
- `POST /api/auth/logout` — Revokes refresh token in database & clears cookies.
- `GET /api/auth/me` — Returns authenticated user profile (`@UseGuards(JwtAuthGuard)`).

### 5.2 Products (`/api/products`)
Must match the exact structure expected by the Next.js storefront:
- `GET /api/products`
  - Query Params:
    - `category`: `All` | `Winter` | `T-Shirts` | `Full Sleeve Shirts` | `Jackets`
    - `sort`: `featured` | `price_asc` | `price_desc`
    - `search`: String query (matches name, detail, or description)
    - `page`: Default 1, `limit`: Default 20
  - Response Output Example:
    ```json
    [
      {
        "id": "p1",
        "name": "Nocturne Down Puffer",
        "detail": "Matte nylon · 700-fill down",
        "category": "Jackets",
        "price": 289,
        "was": null,
        "tag": "New",
        "image": "https://cdn.magicpatterns.com/patterns/generated-images/ee0c2e16-ea18-4d8c-93a6-7c1b78467178.jpg",
        "description": "A clean-lined down puffer in a matte, water-repellent shell...",
        "availableSizes": ["S", "M", "L", "XL", "XXL"]
      }
    ]
    ```
- `GET /api/products/:id` — Single product details with variant inventory.
- `POST /api/products` — Admin-only product creation.
- `PATCH /api/products/:id` — Admin-only product update.
- `DELETE /api/products/:id` — Admin-only soft/hard delete.

### 5.3 Categories (`/api/categories`)
- `GET /api/categories`
  - Returns:
    ```json
    [
      { "name": "All", "description": "Every piece in the current collection — outerwear, knitwear, shirting and heavyweight essentials." },
      { "name": "Winter", "description": "Wool, merino and cashmere-blend layers built for the coldest months." },
      { "name": "T-Shirts", "description": "Heavyweight cotton tees, cut boxy and garment-dyed for a lived-in finish." },
      { "name": "Full Sleeve Shirts", "description": "Oxfords, overshirts and twills to wear alone or layer under a coat." },
      { "name": "Jackets", "description": "Down, suede and technical shells — the pieces that finish an outfit." }
    ]
    ```

### 5.4 Orders & Checkout (`/api/orders`)
- `POST /api/orders/checkout`
  - Body:
    ```json
    {
      "items": [
        { "productId": "p1", "size": "M", "quantity": 1 }
      ],
      "shippingAddress": {
        "recipient": "Safin",
        "street": "123 High Street",
        "city": "London",
        "postalCode": "SW1A 1AA",
        "country": "United Kingdom"
      },
      "guestEmail": "customer@example.com",
      "promoCode": "WINTER10"
    }
    ```
  - **Business Rules**:
    1. Runs inside a **Prisma `$transaction`**.
    2. Verifies inventory for each item size.
    3. Calculates `subtotal`.
    4. Calculates shipping: `subtotal >= 150` -> Free ($0), otherwise flat $12.
    5. Validates and applies promo code discount if provided.
    6. Creates `Order` with `status: PENDING`.
    7. Creates Stripe PaymentIntent for the total amount.
    8. Decrements variant stock.
- `GET /api/orders/:id` — Retrieves order status and item list.
- `GET /api/orders/my-orders` — Retrieves orders for authenticated user.

### 5.5 Coupons (`/api/coupons`)
- `POST /api/coupons/validate`
  - Body: `{ "code": "WINTER10", "subtotal": 343 }`
  - Returns: `{ "valid": true, "discount": 34.30, "code": "WINTER10" }`

### 5.6 Payments & Webhooks (`/api/payments`)
- `POST /api/payments/webhook`
  - **MUST** read raw request body (unparsed JSON).
  - Verifies Stripe signature header (`stripe-signature`).
  - On `payment_intent.succeeded`: Marks order as `PAID`, triggers order confirmation email via BullMQ.
  - On `payment_intent.payment_failed`: Marks order as `FAILED`, rolls back inventory.

---

## 6. Seed Data (`prisma/seed.ts`)

The database seeder **must** populate the 8 initial items to match the current Next.js storefront immediately:

```typescript
import { PrismaClient, ProductSize, ProductTag } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Stello Database...');

  // 1. Create Admin User
  const adminPassword = await argon2.hash('Admin@Stello2026');
  await prisma.user.upsert({
    where: { email: 'admin@stello.com' },
    update: {},
    create: {
      email: 'admin@stello.com',
      passwordHash: adminPassword,
      name: 'Stello Atelier Admin',
      role: 'ADMIN',
    },
  });

  // 2. Create Categories
  const categoriesData = [
    { name: 'Winter', slug: 'winter', description: 'Wool, merino and cashmere-blend layers built for the coldest months.' },
    { name: 'T-Shirts', slug: 't-shirts', description: 'Heavyweight cotton tees, cut boxy and garment-dyed for a lived-in finish.' },
    { name: 'Full Sleeve Shirts', slug: 'full-sleeve-shirts', description: 'Oxfords, overshirts and twills to wear alone or layer under a coat.' },
    { name: 'Jackets', slug: 'jackets', description: 'Down, suede and technical shells — the pieces that finish an outfit.' },
  ];

  const catMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    catMap.set(cat.name, record.id);
  }

  // 3. Create Products with Variants
  const products = [
    {
      id: 'p1',
      name: 'Nocturne Down Puffer',
      slug: 'nocturne-down-puffer',
      detail: 'Matte nylon · 700-fill down',
      description: 'A clean-lined down puffer in a matte, water-repellent shell. Box-quilted baffles, a stowaway hood and storm cuffs keep the cold out without the bulk.',
      category: 'Jackets',
      price: 289,
      tag: ProductTag.NEW,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/ee0c2e16-ea18-4d8c-93a6-7c1b78467178.jpg',
      outOfStock: [ProductSize.XS],
    },
    {
      id: 'p2',
      name: 'Atelier Wool Overcoat',
      slug: 'atelier-wool-overcoat',
      detail: 'Italian wool blend · Charcoal',
      description: 'Our signature single-breasted overcoat in an Italian wool blend. Notch lapels, a half canvas and a fully lined body that drapes cleanly over tailoring or knitwear.',
      category: 'Winter',
      price: 340,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/4868ecee-a165-4c2e-83d8-24cf091515e5.jpg',
      outOfStock: [],
    },
    {
      id: 'p3',
      name: 'Heavyweight Boxy Tee',
      slug: 'heavyweight-boxy-tee',
      detail: '280gsm cotton · Bone',
      description: 'A dense 280gsm cotton jersey cut boxy through the body, with a tight ribbed collar that holds its shape wash after wash.',
      category: 'T-Shirts',
      price: 58,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/d4b309ef-87d3-46ff-a8d4-737220af6488.jpg',
      outOfStock: [],
    },
    {
      id: 'p4',
      name: 'Brushed Twill Overshirt',
      slug: 'brushed-twill-overshirt',
      detail: 'Cotton twill · Olive',
      description: 'A brushed cotton twill overshirt with twin flap pockets. Heavy enough to layer as a light jacket, soft enough to wear as a shirt.',
      category: 'Full Sleeve Shirts',
      price: 124,
      tag: ProductTag.NEW,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/ea171b21-23d8-4572-a0dc-98f98948a3b0.jpg',
      outOfStock: [],
    },
    {
      id: 'p5',
      name: 'Suede Flight Bomber',
      slug: 'suede-flight-bomber',
      detail: 'Goat suede · Tobacco',
      description: 'A flight bomber in soft goat suede, finished with chocolate rib trims and a horn-button chest pocket. Gets better with every wear.',
      category: 'Jackets',
      price: 420,
      wasPrice: 495,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/d594c2f6-b7c1-4667-8232-3a66fb92c390.jpg',
      outOfStock: [ProductSize.XS, ProductSize.XXL],
    },
    {
      id: 'p6',
      name: 'Signature Oversized Tee',
      slug: 'signature-oversized-tee',
      detail: '260gsm cotton · Onyx',
      description: 'Oversized through the shoulder with a dropped sleeve. 260gsm cotton, garment-dyed to a deep onyx with a tonal embroidered mark.',
      category: 'T-Shirts',
      price: 54,
      tag: ProductTag.LOW_STOCK,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/396d8c2d-0474-42b7-a8da-12ea95d4f1ea.jpg',
      outOfStock: [ProductSize.S, ProductSize.M],
    },
    {
      id: 'p7',
      name: 'Crisp Oxford Shirt',
      slug: 'crisp-oxford-shirt',
      detail: 'Egyptian cotton · White',
      description: 'A crisp oxford shirt in long-staple Egyptian cotton with a button-down collar and a single chest pocket. The everyday essential, done properly.',
      category: 'Full Sleeve Shirts',
      price: 98,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/efdc1c40-6809-495c-92ca-8d8e4ec8f3be.jpg',
      outOfStock: [],
    },
    {
      id: 'p8',
      name: 'Fisherman Cable Knit',
      slug: 'fisherman-cable-knit',
      detail: 'Merino wool · Ecru',
      description: 'A fisherman cable knit in extra-fine merino. Traditional Aran stitching, a relaxed fit and ribbed trims for a classic winter layer.',
      category: 'Winter',
      price: 165,
      image: 'https://cdn.magicpatterns.com/patterns/generated-images/c5e2d485-2090-452f-b4b6-333ac9209cbc.jpg',
      outOfStock: [],
    },
  ];

  const allSizes = [
    ProductSize.XS,
    ProductSize.S,
    ProductSize.M,
    ProductSize.L,
    ProductSize.XL,
    ProductSize.XXL,
  ];

  for (const item of products) {
    const categoryId = catMap.get(item.category);
    if (!categoryId) continue;

    const prod = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        id: item.id,
        name: item.name,
        slug: item.slug,
        detail: item.detail,
        description: item.description,
        price: item.price,
        wasPrice: item.wasPrice || null,
        tag: item.tag || null,
        image: item.image,
        categoryId: categoryId,
      },
    });

    // Create stock variants
    for (const size of allSizes) {
      const isOOS = item.outOfStock.includes(size);
      await prisma.productVariant.upsert({
        where: {
          productId_size: { productId: prod.id, size: size },
        },
        update: {},
        create: {
          productId: prod.id,
          size: size,
          stockQuantity: isOOS ? 0 : 25,
          sku: `${item.slug.toUpperCase()}-${size}`,
        },
      });
    }
  }

  // 4. Create Promo Code
  await prisma.coupon.upsert({
    where: { code: 'WINTER10' },
    update: {},
    create: {
      code: 'WINTER10',
      discountType: 'PERCENTAGE',
      value: 10.00,
      minSpend: 100.00,
      isActive: true,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 7. Environment Variables (`.env.example`)

```env
# Application
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database (PostgreSQL)
DATABASE_URL="postgresql://stello_user:stello_secret@localhost:5432/stello_db?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Authentication
JWT_ACCESS_SECRET="stello_super_secret_access_jwt_key_2026"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_SECRET="stello_super_secret_refresh_jwt_key_2026"
JWT_REFRESH_EXPIRATION="7d"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (SMTP / Resend)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
EMAIL_FROM="orders@stello.com"
```

---

## 8. Docker Compose (`docker-compose.yml`)

For local backend database and caching:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: stello-postgres
    restart: always
    environment:
      POSTGRES_USER: stello_user
      POSTGRES_PASSWORD: stello_secret
      POSTGRES_DB: stello_db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: stello-redis
    restart: always
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 9. Implementation Directives for Agents

When implementing the backend, agents must execute the following order of operations:

1. **Scaffold Project**:
   ```bash
   nest new backend --package-manager npm
   cd backend
   npm install @prisma/client prisma @nestjs/passport passport passport-jwt @nestjs/jwt argon2 cookie-parser class-validator class-transformer @nestjs/swagger swagger-ui-express stripe @nestjs/bullmq bullmq @nestjs/config
   npm install -D @types/passport-jwt @types/cookie-parser
   ```
2. **Setup Prisma**:
   ```bash
   npx prisma init
   # Replace prisma/schema.prisma with Section 3 schema
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
3. **CORS & Global Pipes in `main.ts`**:
   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { ValidationPipe } from '@nestjs/common';
   import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
   import * as cookieParser from 'cookie-parser';
   import { AppModule } from './app.module';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule, { rawBody: true });

     app.setGlobalPrefix('api');
     app.use(cookieParser());
     app.enableCors({
       origin: process.env.FRONTEND_URL || 'http://localhost:3000',
       credentials: true,
     });

     app.useGlobalPipes(
       new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
       }),
     );

     // Swagger Setup
     const config = new DocumentBuilder()
       .setTitle('STELLO E-Commerce API')
       .setDescription('Production API documentation for Stello Store')
       .setVersion('1.0')
       .addBearerAuth()
       .build();
     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api/docs', app, document);

     await app.listen(process.env.PORT || 5000);
   }
   bootstrap();
   ```
4. **Connecting to Next.js Frontend**:
   In the frontend, update `src/services/productService.ts`:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
   ```
   Uncomment the `fetch(`${API_BASE_URL}/api/...`)` calls. The payloads, query params, and JSON structures match directly with zero frontend modification required.

