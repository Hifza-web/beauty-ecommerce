"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import api from "@/lib/api";

export type CartProduct = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  rating?: number;
  description?: string;
};

type CartContextType = {
  cart: CartProduct[];
  addToCart: (
    product: Omit<CartProduct, "quantity">,
    quantity?: number
  ) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useAuth();

  // LOAD CART & SYNC
  useEffect(() => {
    async function loadCart() {
      try {
        let localCart: CartProduct[] = [];
        const savedCart = localStorage.getItem("lumera-cart");
        if (savedCart) {
          localCart = JSON.parse(savedCart);
        }

        if (userId) {
          // Sync local items to backend if any
          if (localCart.length > 0) {
            await api.post("/cart/sync", { userId, items: localCart });
            localStorage.removeItem("lumera-cart");
          }

          // Fetch final backend cart
          const res = await api.get(`/cart/${userId}`);
          if (res.data.cart && res.data.cart.items) {
            setCart(
              res.data.cart.items.map((item: any) => ({
                id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
                category: item.product.category,
              }))
            );
          }
        } else {
          setCart(localCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
      setIsLoaded(true);
    }
    loadCart();
  }, [userId]);

  // SAVE CART (Local Storage Fallback)
  useEffect(() => {
    if (!isLoaded || userId) return;

    try {
      localStorage.setItem("lumera-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart, isLoaded, userId]);

  const addToCart = async (
    product: Omit<CartProduct, "quantity">,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    if (userId) {
      try {
        await api.post("/cart/add", { userId, productId: product.id, quantity });
      } catch (err) {
        console.error("Failed to add to backend cart:", err);
      }
    }
  };

  const removeFromCart = async (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    if (userId) {
      try {
        await api.delete("/cart/remove", { data: { userId, productId: id } });
      } catch (err) {
        console.error("Failed to remove from backend cart:", err);
      }
    }
  };

  const updateQuantity = async (id: string | number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    if (userId) {
      try {
        await api.put("/cart/update", { userId, productId: id, quantity });
      } catch (err) {
        console.error("Failed to update backend cart quantity:", err);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    if (userId) {
      try {
        await api.delete(`/cart/clear/${userId}`);
      } catch (err) {
        console.error("Failed to clear backend cart:", err);
      }
    }
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}