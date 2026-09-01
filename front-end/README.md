# Mehria Mobiles — E-Commerce Frontend

A modern, mobile-first e-commerce storefront for **Mehria Mobiles**, a mobile accessories shop based in Lodhran, Punjab, Pakistan. Built with Next.js 16, React 19, Tailwind CSS 4, and Framer Motion.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3.2 | React framework (App Router) |
| [React](https://react.dev) | 19.2.8 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion) | 13.x | Animations & transitions |
| [Lucide React](https://lucide.dev) | 1.x | Icon library |
| [React Icons](https://react-icons.github.io) | 5.x | Additional icons (social) |
| TypeScript | 5.x | Type safety |

---

## 📁 Project Structure

```
src/app/
├── layout.tsx                        # Root layout (metadata, providers, header/footer)
├── page.tsx                          # Home page
├── globals.css                       # Global styles + Tailwind config
│
├── context/
│   └── CartContext.tsx                # Global cart state (Context + Reducer + localStorage)
│
├── data/
│   └── products.ts                   # Shared product data & types
│
├── components/
│   ├── Home/
│   │   ├── Homeparent.tsx            # Home page composition
│   │   ├── Hero.tsx                  # Hero banner
│   │   ├── TrustStrip.tsx            # Trust indicators strip
│   │   ├── Categories.tsx            # Product categories section
│   │   ├── Feauturedproducts.tsx      # Featured products grid
│   │   ├── Whychooseus.tsx           # Why choose us section
│   │   ├── Tesimonials.tsx           # Customer testimonials
│   │   └── VistCTA.tsx               # Visit store CTA
│   └── Reuseable/
│       ├── Header.tsx                # Sticky navbar with live cart badge
│       ├── Footer.tsx                # Site footer
│       └── ClientProviders.tsx       # Client-side context providers wrapper
│
├── shop/
│   └── page.tsx                      # Shop page — browse, filter, sort, add to cart
│
├── cart/
│   └── page.tsx                      # Cart page — manage items, order summary
│
├── checkout/
│   └── page.tsx                      # Checkout page — form, payment, order confirmation
│
├── products/
│   └── page.tsx                      # Products listing page
│
├── about/                            # About page
├── contact/                          # Contact page
│
└── pages/
    ├── AboutPage.tsx
    ├── ContactPage.tsx
    ├── GalleryPage.tsx
    ├── HomePage.tsx
    └── ProductsPage.tsx
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (LTS recommended)
- **npm** 9+ (or yarn/pnpm/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/abubakr-developer/Mehria-Mobile.git
cd Mehria-Mobile/front-end

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ✨ Features

### 🏠 Home Page
- Animated hero banner with CTA
- Trust indicators strip
- Product categories grid
- Featured products with quick add-to-cart
- Customer testimonials carousel
- Visit store CTA section

### 🛍 Shop
- Full product catalog with images, ratings, and prices
- Filter by category (sidebar on desktop, slide-out drawer on mobile)
- Sort by popularity, price, or rating
- Real-time search
- Quick add-to-cart with visual feedback
- Floating mobile cart badge

### 🛒 Cart
- View all cart items with product images
- Adjust quantities (increment/decrement)
- Remove individual items
- Order summary with subtotal and delivery info
- Persistent cart via `localStorage` (survives page refresh)
- Animated empty state with shop CTA

### 💳 Checkout
- Contact & delivery info form with validation
- Cash on Delivery (COD) payment method
- Order summary with item breakdown
- Animated order confirmation with order number
- Form validation with inline error messages

### 🧭 Navigation
- Sticky header with glassmorphism effect
- Live cart badge showing item count
- Mobile hamburger menu with smooth animations
- Utility bar with location, phone, and delivery info

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Dark Charcoal | `#3C3837` | Primary text, dark backgrounds |
| Teal / Cyan | `#00C2D1` | CTA buttons, badges, accents |
| Teal Hover | `#00AAB8` | Button hover states |
| Blue | `#26649A` | Prices, links, secondary actions |
| Light Background | `#F7F8FA` | Page & card backgrounds |
| White | `#FFFFFF` | Card surfaces, nav background |
| Red | `#ef4444` | Sale tags, error states |

### Typography
- **Headings**: Space Grotesk (sans-serif)
- **Body**: Arial, Helvetica, system sans-serif

### Design Tokens
- **Border radius**: `rounded-xl` (12px), `rounded-2xl` (16px)
- **Max width**: `1240px` container
- **Shadows**: Subtle blue-tinted shadows for depth
- **Animations**: Framer Motion — fade-up entries, spring transitions, layout animations

---

## 📄 Pages & Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/shop` | Shop — browse all products |
| `/cart` | Shopping cart |
| `/checkout` | Checkout & order placement |
| `/products` | Products listing |
| `/about` | About Mehria Mobiles |
| `/contact` | Contact information |

---

## 📜 Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start dev server with HMR |
| Build | `npm run build` | Create production build |
| Start | `npm start` | Start production server |
| Lint | `npm run lint` | Run ESLint |

---

## 📝 License

This project is private and proprietary to Mehria Mobiles.
