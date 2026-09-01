"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "@/app/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: number }
  | { type: "DELETE"; productId: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.product.id
      );
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return { items: updated };
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE": {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.productId
      );
      if (idx < 0) return state;
      if (state.items[idx].quantity <= 1) {
        return { items: state.items.filter((_, i) => i !== idx) };
      }
      const updated = [...state.items];
      updated[idx] = { ...updated[idx], quantity: updated[idx].quantity - 1 };
      return { items: updated };
    }
    case "DELETE":
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mehria-cart");
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("mehria-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const value: CartContextValue = {
    items: state.items,
    cartCount,
    cartTotal,
    addToCart: (product) => dispatch({ type: "ADD", product }),
    removeFromCart: (productId) => dispatch({ type: "REMOVE", productId }),
    deleteFromCart: (productId) => dispatch({ type: "DELETE", productId }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
