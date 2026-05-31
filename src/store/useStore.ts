import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem, Order, Banner, CustomerUser, Role, OrderStatus } from "./types";
import { mockProducts, mockBanners, mockUser } from "./mockData";

interface AppState {
  // Global Setup
  role: Role;
  setRole: (role: Role) => void;
  
  // Data
  products: Product[];
  banners: Banner[];
  user: CustomerUser | null;
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  orders: Order[];

  // Cart Actions
  addToCart: (product: Product, quantity: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;

  // Order Actions
  placeOrder: (orderData: Omit<Order, "id" | "createdAt" | "status">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (productId: string, data: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateInventory: (productId: string, newStock: number) => void;
  
  addBanner: (banner: Omit<Banner, "id">) => void;
  updateBanner: (bannerId: string, data: Partial<Banner>) => void;
  toggleBannerStatus: (bannerId: string) => void;
  deleteBanner: (bannerId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Global Setup
      role: "customer",
      setRole: (role) => set({ role }),

      // Initial Data Setup
      products: mockProducts,
      banners: mockBanners,
      user: mockUser,
      cart: [],
      wishlist: [],
      orders: [],

      // Cart Actions
      addToCart: (product, quantity, notes) => set((state) => {
        const existingItem = state.cart.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
                : item
            )
          };
        }
        return { cart: [...state.cart, { product, quantity, notes }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.product.id !== productId)
      })),
      updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          item.product.id === productId ? { ...item, quantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),

      // Wishlist Actions
      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId) 
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      })),

      // Order Actions
      placeOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          status: "Menunggu Pembayaran",
          createdAt: new Date().toISOString()
        };
        
        // Deduct stock
        const currentProducts = get().products;
        const updatedProducts = currentProducts.map(p => {
          const cartItem = orderData.items.find(item => item.product.id === p.id);
          if (cartItem) {
            return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
          }
          return p;
        });

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
          products: updatedProducts
        }));

        return newOrder;
      },
      
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),

      // Admin Actions
      addProduct: (productData) => set((state) => ({
        products: [...state.products, { ...productData, id: `p${Date.now()}` }]
      })),
      updateProduct: (productId, data) => set((state) => ({
        products: state.products.map(p => p.id === productId ? { ...p, ...data } : p)
      })),
      deleteProduct: (productId) => set((state) => ({
        products: state.products.filter(p => p.id !== productId)
      })),
      updateInventory: (productId, newStock) => set((state) => ({
        products: state.products.map(p => p.id === productId ? { ...p, stock: newStock } : p)
      })),

      addBanner: (bannerData) => set((state) => ({
        banners: [...state.banners, { ...bannerData, id: `b${Date.now()}` }]
      })),
      updateBanner: (bannerId, data) => set((state) => ({
        banners: state.banners.map(b => b.id === bannerId ? { ...b, ...data } : b)
      })),
      toggleBannerStatus: (bannerId) => set((state) => ({
        banners: state.banners.map(b => b.id === bannerId ? { ...b, isActive: !b.isActive } : b)
      })),
      deleteBanner: (bannerId) => set((state) => ({
        banners: state.banners.filter(b => b.id !== bannerId)
      }))
    }),
    {
      name: "dapur-ola-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
