'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  CreditCard,
  ShieldCheck,
  Truck
} from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart()
  const { isAuthenticated } = useAuth()
  const [promoCode, setPromoCode] = useState('')
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const handleQuantityChange = (gameId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(gameId)
    } else {
      updateQuantity(gameId, newQuantity)
    }
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'gameonix10') {
      setIsPromoApplied(true)
    }
  }

  const discount = isPromoApplied ? cartTotal * 0.1 : 0
  const finalTotal = cartTotal - discount

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any games to your cart yet.
            </p>
            <Link href="/shop">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-400 mt-2">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.gameId} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-purple-400 font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.gameId, item.quantity - 1)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.gameId, item.quantity + 1)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.gameId)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-red-500 text-red-400 hover:bg-red-900/20"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                {isPromoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (GAMEONIX10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                {!isPromoApplied && (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Try: GAMEONIX10 for 10% off
                    </p>
                  </div>
                )}

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-400 text-center">
                    <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300">
                      Sign in
                    </Link>{' '}
                    to save your cart and access faster checkout
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Security & Shipping Info */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-green-400" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Truck className="h-4 w-4 text-blue-400" />
                  <span>Instant digital delivery</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">We Accept</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    PayPal
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Stripe
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Visa
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Mastercard
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}