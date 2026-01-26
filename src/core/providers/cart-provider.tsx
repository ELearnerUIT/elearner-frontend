"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface CartItem {
    id: string;
    title: string;
    slug: string;
    price: number;
    salePrice?: number;
    thumbnailUrl?: string;
    instructor?: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (courseId: string) => void;
    clearCart: () => void;
    isInCart: (courseId: string) => boolean;
    totalPrice: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart:", e);
            }
        }
        setMounted(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, mounted]);

    const addToCart = (item: CartItem) => {
        setItems((prev) => {
            if (prev.some((i) => i.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (courseId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== courseId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const isInCart = (courseId: string) => {
        return items.some((item) => item.id === courseId);
    };

    const totalPrice = items.reduce((sum, item) => {
        return sum + (item.salePrice || item.price);
    }, 0);

    const itemCount = items.length;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                isInCart,
                totalPrice,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
