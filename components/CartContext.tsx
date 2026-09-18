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
   stock: number;
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
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { userId } = useAuth();

  const showAlert = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  // LOAD CART & SYNC
  useEffect(() => {
    async function loadCart() {
      try {
        let localCart: CartProduct[] = [];
        const savedCart = localStorage.getItem("lumera-cart");
        if (savedCart) {
          let parsed = JSON.parse(savedCart);
          parsed = parsed.map((item: any) => {
            if (item.category && item.category.length === 24) {
               return { ...item, category: "Beauty" }; // Sanitize ObjectId to string
            }
            return item;
          });
          localCart = parsed;
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
                stock: item.product.stock,
                category: item.product.category?.name || item.product.category,
                rating: item.product.rating,
                description: item.product.description,
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
  console.log("DEBUG: addToCart called with product:", product);
  if (quantity > product.stock) {
    showAlert(`Out of stock! Only ${product.stock} items are available.`);
    return;
  }

  if (userId) {
    try {
      const res = await api.post("/cart/add", {
        userId,
        productId: product.id,
        quantity,
      });

      // Backend se updated cart lo
      const backendCart = res.data.cart;

      if (backendCart && backendCart.items) {
        setCart(
          backendCart.items.map((item: any) => ({
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
            stock: item.product.stock,
            category: item.product.category?.name || item.product.category,
            rating: item.product.rating,
            description: item.product.description,
          }))
        );
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        showAlert(err.response.data.message);
        
        // Fetch the latest cart to sync stale stock with backend
        try {
          const res = await api.get(`/cart/${userId}`);
          if (res.data.cart && res.data.cart.items) {
            setCart(
              res.data.cart.items.map((item: any) => ({
                id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
                stock: item.product.stock,
                category: item.product.category?.name || item.product.category,
                rating: item.product.rating,
                description: item.product.description,
              }))
            );
          }
        } catch (refreshErr) {
          // silently ignore refresh errors
        }
      }
    }
  } else {
    // Local cart
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity;

        if (newQuantity > product.stock) {
          showAlert(`Out of stock! Only ${product.stock} items are available.`);
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });
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

  const product = cart.find((item) => item.id === id);

  if (!product) return;

  if (quantity > product.stock) {
    showAlert(`Out of stock! Only ${product.stock} items are available.`);
    return;
  }

  if (userId) {
    try {
      await api.put("/cart/update", {
        userId,
        productId: id,
        quantity,
      });

      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (err: any) {
      if (err.response?.data?.message) {
        showAlert(err.response.data.message);
        
        // Fetch the latest cart to sync stale stock with backend
        try {
          const res = await api.get(`/cart/${userId}`);
          if (res.data.cart && res.data.cart.items) {
            setCart(
              res.data.cart.items.map((item: any) => ({
                id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
                stock: item.product.stock,
                category: item.product.category?.name || item.product.category,
                rating: item.product.rating,
                description: item.product.description,
              }))
            );
          }
        } catch (refreshErr) {
          // silently ignore refresh errors
        }
      }
    }
  } else {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
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
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-3 text-2xl font-semibold text-[#4b3838]">
              Stock Alert
            </h2>
            <p className="mb-6 text-[#6f5b57]">
              {modalMessage}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="rounded-lg bg-[#4b3838] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#6b5050]"
            >
              OK
            </button>
          </div>
        </div>
      )}
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