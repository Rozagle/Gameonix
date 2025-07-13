'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import GameCard from '@/components/GameCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Filter, Search, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock games data - replace with actual API call
const allGames = [
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
  },
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
  },
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

const categories = ['action', 'adventure', 'rpg', 'strategy', 'racing', 'sports', 'simulation', 'puzzle', 'horror', 'multiplayer']
const platforms = ['pc', 'playstation', 'xbox', 'nintendo', 'mobile']

function ShopContent() {
  const searchParams = useSearchParams()
  const [games, setGames] = useState(allGames)
  const [filteredGames, setFilteredGames] = useState(allGames)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const gamesPerPage = 12
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage)
  const startIndex = (currentPage - 1) * gamesPerPage
  const endIndex = startIndex + gamesPerPage
  const currentGames = filteredGames.slice(startIndex, endIndex)

  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedCategories, selectedPlatforms, priceRange, sortBy])

  const applyFilters = () => {
    let filtered = [...allGames]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(game =>
        selectedCategories.includes(game.category)
      )
    }

    // Platform filter
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(game =>
        game.platform.some(p => selectedPlatforms.includes(p))
      )
    }

    // Price filter
    filtered = filtered.filter(game =>
      game.price >= priceRange[0] && game.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.newRelease ? 1 : 0) - (a.newRelease ? 1 : 0))
        break
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredGames(filtered)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedPlatforms([])
    setPriceRange([0, 100])
    setSortBy('featured')
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Categories</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                className="border-gray-600"
              />
              <label htmlFor={category} className="text-sm text-gray-300 capitalize cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Platforms</label>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                className="border-gray-600"
              />
              <label htmlFor={platform} className="text-sm text-gray-300 capitalize cursor-pointer">
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Game Shop</h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Showing {startIndex + 1}-{Math.min(endIndex, filteredGames.length)} of {filteredGames.length} games</span>
              {(selectedCategories.length > 0 || selectedPlatforms.length > 0 || searchTerm) && (
                <div className="flex gap-2 flex-wrap">
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="secondary" className="bg-purple-600/20 text-purple-400">
                      {category}
                    </Badge>
                  ))}
                  {selectedPlatforms.map(platform => (
                    <Badge key={platform} variant="secondary" className="bg-blue-600/20 text-blue-400">
                      {platform}
                    </Badge>
                  ))}
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                      "{searchTerm}"
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden border-gray-600 text-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-gray-900 border-gray-700">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
            <FilterContent />
          </div>

          {/* Games Grid */}
          <div className="flex-1">
            {filteredGames.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">No games found matching your criteria.</div>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                  {currentGames.map((game) => (
                    <GameCard key={game._id} game={game} size={viewMode === 'list' ? 'large' : 'medium'} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page 
                            ? 'bg-purple-600 text-white' 
                            : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}