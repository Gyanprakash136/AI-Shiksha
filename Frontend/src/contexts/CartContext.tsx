import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart as CartAPI } from '../lib/api';
import { toast } from 'sonner';

interface Course {
    id: string;
    title: string;
    slug: string;
    price: number;
    thumbnail_url?: string;
    instructor?: {
        user: {
            name: string;
        };
    };
}

interface CartItem {
    id: string;
    course: Course;
    created_at: string;
}

interface CartContextType {
    items: CartItem[];
    total: number;
    itemCount: number;
    loading: boolean;
    addToCart: (courseId: string) => Promise<void>;
    removeFromCart: (courseId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const refreshCart = async () => {
        try {
            const token = localStorage.getItem('lms_token');
            if (!token) {
                // User not logged in, reset cart
                setItems([]);
                setTotal(0);
                setItemCount(0);
                setLoading(false);
                return;
            }

            const cartData = await CartAPI.get();
            setItems(cartData.items || []);
            setTotal(cartData.total || 0);
            setItemCount(cartData.itemCount || 0);
        } catch (error: any) {
            // If unauthorized, user is not logged in
            if (error.response?.status === 401) {
                setItems([]);
                setTotal(0);
                setItemCount(0);
            } else {
                console.error('Error fetching cart:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (courseId: string) => {
        try {
            const token = localStorage.getItem('lms_token');
            if (!token) {
                toast.error('Please login to add courses to cart');
                return;
            }

            await CartAPI.add(courseId);
            await refreshCart();
            toast.success('Course added to cart');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to add to cart';
            toast.error(message);
            throw error;
        }
    };

    const removeFromCart = async (courseId: string) => {
        try {
            await CartAPI.remove(courseId);
            await refreshCart();
            toast.success('Course removed from cart');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to remove from cart';
            toast.error(message);
        }
    };

    const clearCart = async () => {
        try {
            await CartAPI.clear();
            setItems([]);
            setTotal(0);
            setItemCount(0);
            toast.success('Cart cleared');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to clear cart';
            toast.error(message);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                items,
                total,
                itemCount,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
