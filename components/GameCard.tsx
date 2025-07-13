'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { toast } from 'react-toastify'

interface Game {
  _id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  platform: string[]
  rating: number
  reviewCount: number
  images: string[]
  featured?: boolean
  popular?: boolean
  newRelease?: boolean
  developer: string
  publisher: string
}

interface GameCardProps {
  game: Game
  size?: 'small' | 'medium' | 'large'
}

export default function GameCard({ game, size = 'medium' }: GameCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      gameId: game._id,
      title: game.title,
      price: game.price,
      image: game.images[0],
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    toast.success(
      isWishlisted 
        ? `${game.title} removed from wishlist`
        : `${game.title} added to wishlist`
    )
  }

  const cardSizes = {
    small: 'w-48',
    medium: 'w-72',
    large: 'w-80'
  }

  const imageSizes = {
    small: 'h-32',
    medium: 'h-40',
    large: 'h-48'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/game/${game._id}`}>
        <Card className={`${cardSizes[size]} bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm`}>
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={game.images[0] || 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg'}
                alt={game.title}
                width={320}
                height={192}
                className={`w-full ${imageSizes[size]} object-cover group-hover:scale-110 transition-transform duration-300`}
              />
              
              {/* Overlay badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {game.newRelease && (
                  <Badge className="bg-green-600/90 text-white text-xs">New</Badge>
                )}
                {game.featured && (
                  <Badge className="bg-purple-600/90 text-white text-xs">Featured</Badge>
                )}
                {game.discount && game.discount > 0 && (
                  <Badge className="bg-red-600/90 text-white text-xs">
                    -{game.discount}%
                  </Badge>
                )}
              </div>

              {/* Wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlist}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </Button>

              {/* Platform badges */}
              <div className="absolute bottom-2 left-2 flex gap-1">
                {game.platform.slice(0, 3).map((platform) => (
                  <Badge 
                    key={platform} 
                    variant="secondary" 
                    className="text-xs bg-black/70 text-white"
                  >
                    {platform.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
                {game.title}
              </h3>
              
              <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                {game.developer}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-300">{game.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">({game.reviewCount})</span>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {game.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {game.originalPrice && game.originalPrice > game.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        ${game.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg font-bold text-purple-400">
                        ${game.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-purple-400">
                      ${game.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}