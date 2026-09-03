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

type WishlistProduct = {
  id: string | number;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistProduct[];
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useAuth();

  // LOAD WISHLIST & SYNC
  useEffect(() => {
    async function loadWishlist() {
      try {
        let localWishlist: WishlistProduct[] = [];
        const savedWishlist = localStorage.getItem("lumera-wishlist");
        if (savedWishlist) {
          localWishlist = JSON.parse(savedWishlist);
        }

        if (userId) {
          // Sync local items to backend if any
          if (localWishlist.length > 0) {
            await api.post("/wishlist/sync", { userId, items: localWishlist });
            localStorage.removeItem("lumera-wishlist");
          }

          // Fetch final backend wishlist
          const res = await api.get(`/wishlist/${userId}`);
          if (res.data.wishlist && res.data.wishlist.products) {
            setWishlist(
              res.data.wishlist.products.map((product: any) => ({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
              }))
            );
          }
        } else {
          setWishlist(localWishlist);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
      setIsLoaded(true);
    }
    loadWishlist();
  }, [userId]);

  // SAVE WISHLIST (Local Storage Fallback)
  useEffect(() => {
    if (!isLoaded || userId) return;

    try {
      localStorage.setItem("lumera-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlist, isLoaded, userId]);

  const addToWishlist = async (product: WishlistProduct) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });

    if (userId) {
      try {
        await api.post("/wishlist/add", { userId, productId: product.id });
      } catch (err) {
        console.error("Failed to add to backend wishlist:", err);
      }
    }
  };

  const removeFromWishlist = async (id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));

    if (userId) {
      try {
        await api.delete("/wishlist/remove", { data: { userId, productId: id } });
      } catch (err) {
        console.error("Failed to remove from backend wishlist:", err);
      }
    }
  };

  const isInWishlist = (id: string | number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}