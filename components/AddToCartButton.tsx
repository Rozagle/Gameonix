'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CartItem {
  gameId: string
  title: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  game: CartItem
  className?: string
}

export default function AddToCartButton({ game, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(game)
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={cn(className)}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}