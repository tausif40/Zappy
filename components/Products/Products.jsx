"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Search, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Products() {
	const [ viewMode, setViewMode ] = useState("grid")
	const [ searchQuery, setSearchQuery ] = useState("")

	const products = [
		{
			id: 1,
			name: "Princess Crown Set",
			category: "Costumes & Accessories",
			price: "₹899",
			originalPrice: "₹1,299",
			rating: 4.8,
			reviews: 124,
			image: "/placeholder.svg?height=300&width=300",
			badge: "Best Seller",
			inStock: true,
			description: "Beautiful princess crown set with matching accessories",
		},
		{
			id: 2,
			name: "Superhero Cape Collection",
			category: "Costumes & Accessories",
			price: "₹1,299",
			originalPrice: "₹1,799",
			rating: 4.9,
			reviews: 89,
			image: "/placeholder.svg?height=300&width=300",
			badge: "New",
			inStock: true,
			description: "Complete superhero cape set with masks and accessories",
		},
		{
			id: 3,
			name: "Birthday Party Decoration Kit",
			category: "Decorations",
			price: "₹2,499",
			originalPrice: "₹3,499",
			rating: 4.7,
			reviews: 156,
			image: "/placeholder.svg?height=300&width=300",
			badge: "Popular",
			inStock: true,
			description: "Complete party decoration kit with balloons, banners, and more",
		},
		{
			id: 4,
			name: "Magic Show Props Set",
			category: "Entertainment",
			price: "₹1,899",
			originalPrice: "₹2,599",
			rating: 4.6,
			reviews: 67,
			image: "/placeholder.svg?height=300&width=300",
			badge: "Limited",
			inStock: false,
			description: "Professional magic show props for entertaining kids",
		},
		{
			id: 5,
			name: "Jungle Theme Backdrop",
			category: "Decorations",
			price: "₹3,299",
			originalPrice: "₹4,499",
			rating: 4.8,
			reviews: 92,
			image: "/placeholder.svg?height=300&width=300",
			badge: "Premium",
			inStock: true,
			description: "Large jungle theme backdrop perfect for photo sessions",
		},
		{
			id: 6,
			name: "Kids Party Games Bundle",
			category: "Games & Activities",
			price: "₹1,599",
			originalPrice: "₹2,199",
			rating: 4.5,
			reviews: 78,
			image: "/placeholder.svg?height=300&width=300",
			badge: "Bundle",
			inStock: true,
			description: "Collection of fun party games and activities for kids",
		},
	]

	const categories = [
		"Costumes & Accessories",
		"Decorations",
		"Entertainment",
		"Games & Activities",
		"Party Supplies",
		"Photography Props",
	]

	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Party Products
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Everything you need to create the perfect party experience
						</p>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Search and Filters */}
				<div className="flex flex-col lg:flex-row gap-4 mb-8">
					<div className="flex-1 relative">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
						<Input
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-12 pr-4 py-3 border-2 focus:border-purple-500"
						/>
					</div>

					<div className="flex gap-4">
						<Select>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Short by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="popular">Most Popular</SelectItem>
								<SelectItem value="price-low">Price: Low to High</SelectItem>
								<SelectItem value="price-high">Price: High to Low</SelectItem>
								<SelectItem value="rating">Highest Rated</SelectItem>
								<SelectItem value="newest">Newest First</SelectItem>
							</SelectContent>
						</Select>

						<div className="flex border rounded-lg">
							<Button
								variant={viewMode === "grid" ? "default" : "ghost"}
								size="icon"
								onClick={() => setViewMode("grid")}
								className="rounded-r-none"
							>
								<Grid className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="icon"
								onClick={() => setViewMode("list")}
								className="rounded-l-none"
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Category Tabs */}
				<Tabs defaultValue="all" className="mb-8">
					<TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="costumes">Costumes</TabsTrigger>
						<TabsTrigger value="decorations">Decorations</TabsTrigger>
						<TabsTrigger value="entertainment">Entertainment</TabsTrigger>
						<TabsTrigger value="games">Games</TabsTrigger>
						<TabsTrigger value="supplies">Supplies</TabsTrigger>
						<TabsTrigger value="props">Props</TabsTrigger>
					</TabsList>
				</Tabs>

				{/* Products Grid/List */}
				<div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"}>
					{products.map((product, index) => (
						<Card
							key={product.id}
							className={`group overflow-hidden border shadow ${viewMode === "list" ? "flex" : ""}`}
						// style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className={`relative ${viewMode === "list" ? "w-60 flex-shrink-0" : ""}`}>
								<Image
									src={product.image || "/placeholder.svg"}
									alt={product.name}
									width={300}
									height={300}
									className={`object-cover duration-300 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
								/>
								<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
									{product.badge}
								</Badge>
								<Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
									<Heart className="h-4 w-4" />
								</Button>
								{!product.inStock && (
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
										<Badge variant="destructive">Out of Stock</Badge>
									</div>
								)}
							</div>

							<CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<h3 className="text-lg font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
											{product.name}
										</h3>
										<p className="text-sm text-muted-foreground mb-2">{product.category}</p>
										{viewMode === "list" && <p className="text-sm text-muted-foreground mb-3">{product.description}</p>}
									</div>
									<div className="text-right ml-4">
										<div className="text-lg font-bold text-purple-600">{product.price}</div>
										<div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
									</div>
								</div>

								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center">
										<Star className="h-4 w-4 text-yellow-400 fill-current" />
										<span className="ml-1 font-medium text-sm">{product.rating}</span>
										<span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
									</div>
									{product.inStock && (
										<Badge variant="secondary" className="text-xs">
											In Stock
										</Badge>
									)}
								</div>

								<div className="flex gap-2">
									<Button
										className="flex-1 bg-primary text-white"
										disabled={!product.inStock}
									>
										<ShoppingCart className="mr-2 h-4 w-4" />
										{product.inStock ? "Add to Cart" : "Out of Stock"}
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Load More */}
				<div className="text-center mt-12">
					<Button variant="outline" size="lg" className="px-8">
						Load More Products
					</Button>
				</div>
			</div>
		</div>
	)
}
