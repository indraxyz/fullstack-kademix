"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getCart,
  addToCart as addToCartStorage,
  removeFromCart as removeFromCartStorage,
  clearCart as clearCartStorage,
  type CartProgramItem,
} from "./cart-store";

export function useCart() {
  const [items, setItems] = useState<CartProgramItem[]>([]);

  const refresh = useCallback(() => {
    setItems(getCart());
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("kademix-cart-update", handler);
    return () => window.removeEventListener("kademix-cart-update", handler);
  }, [refresh]);

  const addItem = useCallback((item: CartProgramItem) => {
    addToCartStorage(item);
    setItems(getCart());
  }, []);

  const removeItem = useCallback((index: number) => {
    removeFromCartStorage(index);
    setItems(getCart());
  }, []);

  const clear = useCallback(() => {
    clearCartStorage();
    setItems([]);
  }, []);

  return { items, addItem, removeItem, clear, refresh };
}
