'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

interface CartItem {
  gameId: string
  title: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (gameId: string) => void
  updateQuantity: (gameId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  loading: boolean
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  loading: false,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user, isAuthenticated } = useAuth()

  // Load cart from localStorage or user profile
  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch user's cart from database
      fetchUserCart()
    } else {
      // Load from localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [isAuthenticated, user])

  // Save cart to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isAuthenticated])

  const fetchUserCart = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/cart')
      if (response.ok) {
        const data = await response.json()
        setCart(data.cart || [])
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserCart = async (updatedCart: CartItem[]) => {
    if (!isAuthenticated) return

    try {
      await fetch('/api/user/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart }),
      })
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  let updatedCart: CartItem[] = []

  setCart(prevCart => {
    const existingItem = prevCart.find(cartItem => cartItem.gameId === item.gameId)

    if (existingItem) {
      updatedCart = prevCart.map(cartItem =>
        cartItem.gameId === item.gameId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    } else {
      updatedCart = [...prevCart, { ...item, quantity: 1 }]
    }

    return updatedCart
  })

  updateUserCart(updatedCart)
  toast.success(`${item.title} added to cart!`)
}

  const removeFromCart = (gameId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.gameId !== gameId)
      updateUserCart(updatedCart)
      toast.info('Item removed from cart')
      return updatedCart
    })
  }

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId)
      return
    }

    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.gameId === gameId ? { ...item, quantity } : item
      )
      updateUserCart(updatedCart)
      return updatedCart
    })
  }

  const clearCart = () => {
    setCart([])
    updateUserCart([])
    toast.success('Cart cleared')
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}