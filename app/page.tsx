import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import GameCard from '@/components/GameCard'
import { ArrowRight, Star, TrendingUp, Gamepad2, Users, Trophy, Zap } from 'lucide-react'

// Mock data - replace with actual database calls
const featuredGames = [
  {
    _id: '1',
    title: 'Cyberpunk 2077',
    description: 'An open-world action-adventure story set in Night City.',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    category: 'action',
    platform: ['pc', 'playstation', 'xbox'],
    rating: 4.5,
    reviewCount: 15420,
    images: ['https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg'],
    featured: true,
    newRelease: false,
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt'
  },
  {
    _id: '2',
    title: 'The Witcher 3: Wild Hunt',
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    category: 'rpg',
    platform: ['pc', 'playstation', 'xbox', 'nintendo'],
    rating: 4.8,
    reviewCount: 28930,
    images: ['https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'],
    featured: true,
    popular: true,
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt'
  },
  {
    _id: '3',
    title: 'Elden Ring',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.',
    price: 59.99,
    category: 'action',
    platform: ['pc', 'playstation', 'xbox'],
    rating: 4.7,
    reviewCount: 42150,
    images: ['https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'],
    featured: true,
    newRelease: true,
    developer: 'FromSoftware',
    publisher: 'Bandai Namco'
  }
]

const newGames = [
  {
    _id: '4',
    title: 'Starfield',
    description: 'Discover the mysteries of space in this epic RPG.',
    price: 69.99,
    category: 'rpg',
    platform: ['pc', 'xbox'],
    rating: 4.3,
    reviewCount: 8420,
    images: ['https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg'],
    newRelease: true,
    developer: 'Bethesda Game Studios',
    publisher: 'Bethesda Softworks'
  },
  {
    _id: '5',
    title: 'Spider-Man 2',
    description: 'Swing through New York as Spider-Man in this action-packed adventure.',
    price: 69.99,
    category: 'action',
    platform: ['playstation'],
    rating: 4.6,
    reviewCount: 12350,
    images: ['https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg'],
    newRelease: true,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment'
  },
  {
    _id: '6',
    title: 'Baldur\'s Gate 3',
    description: 'A story-rich, party-based RPG set in the universe of Dungeons & Dragons.',
    price: 59.99,
    category: 'rpg',
    platform: ['pc', 'playstation'],
    rating: 4.9,
    reviewCount: 35670,
    images: ['https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'],
    newRelease: true,
    developer: 'Larian Studios',
    publisher: 'Larian Studios'
  }
]

const mostSales = [
  {
    _id: '7',
    title: 'Grand Theft Auto V',
    description: 'The biggest, most dynamic and diverse open world ever created.',
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    category: 'action',
    platform: ['pc', 'playstation', 'xbox'],
    rating: 4.5,
    reviewCount: 89420,
    images: ['https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'],
    popular: true,
    developer: 'Rockstar North',
    publisher: 'Rockstar Games'
  },
  {
    _id: '8',
    title: 'Red Dead Redemption 2',
    description: 'America, 1899. The end of the Wild West era has begun.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    category: 'action',
    platform: ['pc', 'playstation', 'xbox'],
    rating: 4.7,
    reviewCount: 67890,
    images: ['https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'],
    popular: true,
    developer: 'Rockstar Studios',
    publisher: 'Rockstar Games'
  },
  {
    _id: '9',
    title: 'Minecraft',
    description: 'Build, explore, and survive in this infinite world of creativity.',
    price: 26.95,
    category: 'simulation',
    platform: ['pc', 'playstation', 'xbox', 'nintendo', 'mobile'],
    rating: 4.4,
    reviewCount: 125000,
    images: ['https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'],
    popular: true,
    developer: 'Mojang Studios',
    publisher: 'Microsoft Studios'
  }
]

const stats = [
  { icon: Users, label: 'Active Players', value: '2.5M+' },
  { icon: Gamepad2, label: 'Games Available', value: '50K+' },
  { icon: Trophy, label: 'Awards Won', value: '150+' },
  { icon: Zap, label: 'Downloads', value: '100M+' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg"
            alt="Gaming Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to Gameonix
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover the ultimate gaming experience with thousands of games, exclusive deals, and the latest releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                  Explore Games
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/shop?filter=featured">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-6 text-lg">
                  View Featured
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating game icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float absolute top-20 left-10 opacity-20">
            <Gamepad2 className="h-12 w-12 text-purple-400" />
          </div>
          <div className="animate-float absolute top-40 right-20 opacity-20" style={{ animationDelay: '1s' }}>
            <TrendingUp className="h-10 w-10 text-blue-400" />
          </div>
          <div className="animate-float absolute bottom-40 left-20 opacity-20" style={{ animationDelay: '2s' }}>
            <Trophy className="h-14 w-14 text-yellow-400" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Games</h2>
              <p className="text-gray-400">Hand-picked games just for you</p>
            </div>
            <Link href="/shop?filter=featured">
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              {featuredGames.map((game) => (
                <GameCard key={game._id} game={game} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">New Releases</h2>
              <p className="text-gray-400">Latest games hitting the store</p>
            </div>
            <Link href="/shop?filter=new">
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-600 hover:text-white">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newGames.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Most Sales</h2>
              <p className="text-gray-400">Top-selling games of all time</p>
            </div>
            <Link href="/shop?filter=popular">
              <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostSales.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">Get the latest news about game releases, exclusive deals, and gaming events.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}