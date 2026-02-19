const CART_STORAGE_KEY = "kademix_cart";

export interface CartProgramItem {
  studyProgram: string;
  codingTrack?: string;
}

function getStoredCart(): CartProgramItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartProgramItem =>
        item != null &&
        typeof item === "object" &&
        "studyProgram" in item &&
        typeof (item as CartProgramItem).studyProgram === "string"
    );
  } catch {
    return [];
  }
}

function setStoredCart(items: CartProgramItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("kademix-cart-update"));
  } catch {
    // ignore
  }
}

export function getCart(): CartProgramItem[] {
  return getStoredCart();
}

export function addToCart(item: CartProgramItem): void {
  const items = getStoredCart();
  const exists = items.some(
    (i) =>
      i.studyProgram === item.studyProgram &&
      (i.codingTrack ?? "") === (item.codingTrack ?? "")
  );
  if (!exists) items.push(item);
  setStoredCart(items);
}

export function removeFromCart(index: number): void {
  const items = getStoredCart();
  if (index < 0 || index >= items.length) return;
  items.splice(index, 1);
  setStoredCart(items);
}

export function clearCart(): void {
  setStoredCart([]);
}

export function setCartForCheckout(items: CartProgramItem[]): void {
  setStoredCart(items);
}
