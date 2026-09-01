# Mehria Mobiles Frontend

This project is the frontend for Mehria Mobiles, a mobile accessories and wholesale store based in Lodhran, Pakistan. It is built with Next.js, React, TypeScript, and Tailwind CSS.

The website is designed to help customers:
- browse the home page,
- explore products,
- view the store gallery,
- learn about the brand,
- contact the business,
- and complete a basic cart and checkout flow.

## Project Workflow

### 1. Home page
The home page is the entry point of the site.

It includes:
- hero section with main message and call-to-action buttons,
- trust and delivery highlights,
- product categories,
- featured products,
- testimonial area,
- and final CTA sections.

This page is meant to introduce the brand and guide the customer into the shopping flow.

### 2. Navigation
The header is the main navigation system.

It contains links to:
- Home
- About
- Gallery
- Products
- Contact

The navbar also contains:
- cart button with count,
- search input,
- shop CTA,
- mobile menu for smaller screens.

This makes the user journey simple and consistent across the website.

### 3. About page
The About page explains the business and its purpose.

It tells users:
- who Mehria Mobiles is,
- what kind of products they sell,
- where the shop is located,
- and why customers should trust the business.

This page is mainly for branding and trust-building.

### 4. Gallery page
The Gallery page is a visual showcase page.

It is designed to show products in a more lifestyle or collection-based way instead of a strict catalog layout. It helps customers visually browse the store and feel the product range before they choose specific items.

### 5. Products page
The Products page is the actual catalog or shopping list.

Its job is to present the available products clearly so users can:
- view product items,
- browse categories,
- compare products,
- add products to the cart,
- and continue to checkout.

This is the main store page for shopping.

### 6. Cart and checkout flow
After selecting products, the customer goes into the cart flow.

The cart page usually includes:
- list of selected items,
- quantity update controls,
- remove item option,
- summary with subtotal and totals,
- CTA to continue to checkout.

The checkout page then handles the final order process, with customer details and order information.

### 7. Contact page
The Contact page is the support and business information page.

It usually includes:
- phone number,
- email address,
- location details,
- and a contact form for customer messages.

This page helps users reach the store directly.

## App Structure

```bash
front-end/
├── src/
│   └── app/
│       ├── about/
│       ├── cart/
│       ├── checkout/
│       ├── components/
│       │   ├── Home/
│       │   └── Reuseable/
│       ├── contact/
│       ├── context/
│       ├── data/
│       ├── gallery/
│       ├── pages/
│       ├── products/
│       ├── shop/
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       └── ...
├── public/
│   └── imagegs/
│       └── products/
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md
├── eslint.config.mjs
└── postcss.config.mjs
```

## Route Flow

The app uses the Next.js App Router.

Examples of routes in this project:

- `/` → Home page
- `/about` → About page
- `/gallery` → Gallery page
- `/products` → Products page
- `/shop` → Shopping page
- `/cart` → Cart page
- `/checkout` → Checkout page
- `/contact` → Contact page

## Development Process

A common development workflow for this project is:

1. Start with the route or page you want to build.
2. Add or edit the page component inside `src/app/pages`.
3. Create or update the route file in `src/app/.../page.tsx`.
4. Reuse existing components when possible.
5. Update the header or footer navigation if a new page is added.
6. Run the build to confirm everything compiles properly.
7. Check the route in the browser and fix any rendering or linking issues.

## Setup Instructions

### Install dependencies

```bash
cd front-end
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Start production build

```bash
npm start
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Summary

The workflow of this project is straightforward:

- A visitor enters through the home page.
- They move through key pages like About, Gallery, and Products.
- They add products to the cart and continue to checkout.
- They can contact the business for support or store visits.

This structure keeps the project easy to understand, expand, and maintain.
