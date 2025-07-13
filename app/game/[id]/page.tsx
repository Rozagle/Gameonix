import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Heart, Share2, Calendar, Users, HardDrive, Monitor, Cpu, MemoryStick } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'

// Mock game data - replace with actual database call
const mockGame = {
  _id: '1',
  title: 'Cyberpunk 2077',
  description: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',
  price: 59.99,
  originalPrice: 79.99,
  discount: 25,
  category: 'action',
  platform: ['pc', 'playstation', 'xbox'],
  rating: 4.5,
  reviewCount: 15420,
  images: [
    'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg',
    'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'
  ],
  featured: true,
  newRelease: false,
  developer: 'CD Projekt RED',
  publisher: 'CD Projekt',
  releaseDate: new Date('2020-12-10'),
  tags: ['Open World', 'RPG', 'Cyberpunk', 'Story Rich', 'Character Customization'],
  requirements: {
    minimum: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-3570K or AMD FX-8310',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 780 or AMD Radeon RX 470',
      storage: '70 GB available space'
    },
    recommended: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-4790 or AMD Ryzen 3 3200G',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB or AMD Radeon R9 Fury',
      storage: '70 GB available space'
    }
  }
}

// Mock related games
const relatedGames = [
  {
    _id: '2',
    title: 'The Witcher 3: Wild Hunt',
    price: 39.99,
    images: ['https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'],
    rating: 4.8,
    developer: 'CD Projekt RED'
  },
  {
    _id: '3',
    title: 'Deus Ex: Mankind Divided',
    price: 29.99,
    images: ['https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg'],
    rating: 4.3,
    developer: 'Eidos Montreal'
  }
]

interface PageProps {
  params: {
    id: string
  }
}

async function getGame(id: string) {
  // In a real app, fetch from database
  if (id === '1') {
    return mockGame
  }
  return null
}

export async function generateMetadata({ params }: PageProps) {
  const game = await getGame(params.id)

  if (!game) {
    return {
      title: 'Game Not Found - Gameonix',
    }
  }

  return {
    title: `${game.title} - Gameonix`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      images: [game.images[0]],
    },
  }
}

export async function generateStaticParams() {
  // In a real app, you would fetch all game IDs from your database
  // For now, we'll return the mock game ID
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' }
  ]
}

export default async function GamePage({ params }: PageProps) {
  const game = await getGame(params.id)

  if (!game) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-purple-400">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-purple-400">Shop</Link>
            <span>/</span>
            <span className="text-white">{game.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Images */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={game.images[0]}
                  alt={game.title}
                  fill
                  className="object-cover"
                  priority
                />
                {game.discount && game.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-600/90 text-white">
                    -{game.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {game.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${game.title} screenshot ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Info & Purchase */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {game.newRelease && (
                  <Badge className="bg-green-600 text-white">New Release</Badge>
                )}
                {game.featured && (
                  <Badge className="bg-purple-600 text-white">Featured</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">{game.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({game.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Developer: {game.developer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Released: {game.releaseDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Available on:</h3>
              <div className="flex gap-2">
                {game.platform.map((platform) => (
                  <Badge key={platform} variant="outline" className="border-gray-600 text-gray-300">
                    {platform.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Price & Purchase */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {game.originalPrice && game.originalPrice > game.price ? (
                  <>
                    <span className="text-2xl font-bold text-purple-400">
                      ${game.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-purple-400">
                    ${game.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <AddToCartButton
                  game={{
                    gameId: game._id,
                    title: game.title,
                    price: game.price,
                    image: game.images[0]
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">About {game.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {game.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Minimum Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">OS</div>
                        <div className="text-sm text-gray-400">{game.requirements.minimum.os}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Processor</div>
                        <div className="text-sm text-gray-400">{game.requirements.minimum.processor}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MemoryStick className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Memory</div>
                        <div className="text-sm text-gray-400">{game.requirements.minimum.memory}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Graphics</div>
                        <div className="text-sm text-gray-400">{game.requirements.minimum.graphics}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Storage</div>
                        <div className="text-sm text-gray-400">{game.requirements.minimum.storage}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Recommended Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">OS</div>
                        <div className="text-sm text-gray-400">{game.requirements.recommended.os}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Processor</div>
                        <div className="text-sm text-gray-400">{game.requirements.recommended.processor}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MemoryStick className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Memory</div>
                        <div className="text-sm text-gray-400">{game.requirements.recommended.memory}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Graphics</div>
                        <div className="text-sm text-gray-400">{game.requirements.recommended.graphics}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-medium text-gray-300">Storage</div>
                        <div className="text-sm text-gray-400">{game.requirements.recommended.storage}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    Reviews feature coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Games */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGames.map((relatedGame) => (
              <Link key={relatedGame._id} href={`/game/${relatedGame._id}`}>
                <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative aspect-video rounded-t-lg overflow-hidden">
                      <Image
                        src={relatedGame.images[0]}
                        alt={relatedGame.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {relatedGame.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{relatedGame.developer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-300">{relatedGame.rating}</span>
                        </div>
                        <span className="text-purple-400 font-bold">${relatedGame.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}