"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, MapPin, Calendar, Users, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KidsEventsPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [priceRange, setPriceRange] = useState("all")
	const [selectedCity, setSelectedCity] = useState("all")

	const events = [
		{
			id: 1,
			title: "Princess Theme Birthday Party",
			vendor: "Magic Moments Events",
			rating: 4.9,
			reviews: 156,
			price: "₹8,999",
			originalPrice: "₹12,999",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Most Popular",
			city: "Mumbai",
			category: "birthday",
			ageGroup: "3-8 years",
			duration: "3 hours",
			includes: ["Decorations", "Entertainment", "Photography", "Cake"],
		},
		{
			id: 2,
			title: "Superhero Adventure Party",
			vendor: "Hero Events Co.",
			rating: 4.8,
			reviews: 203,
			price: "₹9,499",
			originalPrice: "₹13,499",
			image: "/placeholder.svg?height=300&width=400",
			badge: "New",
			city: "Delhi",
			category: "birthday",
			ageGroup: "4-10 years",
			duration: "4 hours",
			includes: ["Costumes", "Games", "Entertainment", "Snacks"],
		},
		{
			id: 3,
			title: "Jungle Safari Adventure",
			vendor: "Wild Celebrations",
			rating: 4.7,
			reviews: 89,
			price: "₹7,999",
			originalPrice: "₹10,999",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Trending",
			city: "Bangalore",
			category: "themed",
			ageGroup: "5-12 years",
			duration: "3.5 hours",
			includes: ["Animal Shows", "Face Painting", "Games", "Refreshments"],
		},
		{
			id: 4,
			title: "Unicorn Magic Party",
			vendor: "Dreamland Events",
			rating: 4.9,
			reviews: 124,
			price: "₹8,499",
			originalPrice: "₹11,999",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Premium",
			city: "Pune",
			category: "birthday",
			ageGroup: "3-9 years",
			duration: "3 hours",
			includes: ["Unicorn Performer", "Crafts", "Magic Show", "Treats"],
		},
		{
			id: 5,
			title: "Space Explorer Mission",
			vendor: "Cosmic Kids",
			rating: 4.6,
			reviews: 67,
			price: "₹10,999",
			originalPrice: "₹14,999",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Interactive",
			city: "Hyderabad",
			category: "educational",
			ageGroup: "6-12 years",
			duration: "4 hours",
			includes: ["Planetarium", "Experiments", "Astronaut Training", "Lunch"],
		},
		{
			id: 6,
			title: "Frozen Winter Wonderland",
			vendor: "Ice Queen Events",
			rating: 4.8,
			reviews: 198,
			price: "₹9,999",
			originalPrice: "₹13,999",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Seasonal",
			city: "Chennai",
			category: "themed",
			ageGroup: "3-10 years",
			duration: "3.5 hours",
			includes: ["Elsa Performer", "Snow Machine", "Crafts", "Themed Cake"],
		},
	]

	const categories = [
		{ value: "all", label: "All Categories" },
		{ value: "birthday", label: "Birthday Parties" },
		{ value: "themed", label: "Themed Events" },
		{ value: "educational", label: "Educational" },
		{ value: "outdoor", label: "Outdoor Adventures" },
	]

	const cities = [
		{ value: "all", label: "All Cities" },
		{ value: "mumbai", label: "Mumbai" },
		{ value: "delhi", label: "Delhi" },
		{ value: "bangalore", label: "Bangalore" },
		{ value: "pune", label: "Pune" },
		{ value: "hyderabad", label: "Hyderabad" },
		{ value: "chennai", label: "Chennai" },
	]

	const priceRanges = [
		{ value: "all", label: "All Prices" },
		{ value: "under-5000", label: "Under ₹5,000" },
		{ value: "5000-10000", label: "₹5,000 - ₹10,000" },
		{ value: "10000-15000", label: "₹10,000 - ₹15,000" },
		{ value: "above-15000", label: "Above ₹15,000" },
	]

	const performers = [
		{
			title: "Character Actors",
			description: "Bring your child's favorite characters to life with our professional character performers.",
			price: "₹5,000",
		},
		{
			title: "Magicians",
			description: "Amaze your guests with mind-boggling magic tricks and illusions.",
			price: "₹7,500",
		},
		{
			title: "Balloon Artists",
			description: "Create amazing balloon sculptures and toys for your guests.",
			price: "₹3,500",
		},
		{
			title: "Face Painters",
			description: "Transform your guests with colorful face paint designs.",
			price: "₹4,000",
		},
		{
			title: "Puppet Show",
			description: "Interactive puppet show with stories.",
			price: "₹4,500",
		},
		{
			title: "Character Mascot",
			description: "Popular character appearances.",
			price: "₹6,000",
		},
	];

	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Kids Events
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Discover amazing themed parties and events designed to create magical memories for your children
						</p>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search for themes, vendors, or locations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-6 text-lg border-2 focus:border-purple-500 rounded-full"
							/>
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar - Desktop */}
					{/* <div className="hidden lg:block w-80 space-y-6">
						<Card className="p-6">
							<h3 className="text-lg font-semibold mb-4">Filters</h3>

							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium mb-2">Category</label>
									<Select value={selectedCategory} onValueChange={setSelectedCategory}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.value} value={category.value}>
													{category.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">City</label>
									<Select value={selectedCity} onValueChange={setSelectedCity}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{cities.map((city) => (
												<SelectItem key={city.value} value={city.value}>
													{city.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">Price Range</label>
									<Select value={priceRange} onValueChange={setPriceRange}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{priceRanges.map((range) => (
												<SelectItem key={range.value} value={range.value}>
													{range.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className="block text-sm font-medium mb-3">Age Group</label>
									<div className="space-y-2">
										{["0-3 years", "3-6 years", "6-10 years", "10+ years"].map((age) => (
											<div key={age} className="flex items-center space-x-2">
												<Checkbox id={age} />
												<label htmlFor={age} className="text-sm">
													{age}
												</label>
											</div>
										))}
									</div>
								</div>
							</div>
						</Card>
					</div> */}

					{/* Main Content */}
					<div className="flex-1">
						{/* Mobile Filters */}
						<div className="lg:hidden mb-6">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" className="w-full">
										<SlidersHorizontal className="mr-2 h-4 w-4" />
										Filters
									</Button>
								</SheetTrigger>
								<SheetContent side="left" className="w-80">
									<div className="space-y-6 mt-6">
										<h3 className="text-lg font-semibold">Filters</h3>
										{/* Same filter content as desktop */}
									</div>
								</SheetContent>
							</Sheet>
						</div>

						{/* Results Header */}
						{/* <div className="flex justify-between items-center mb-6">
							<p className="text-muted-foreground">Showing {events.length} events</p>
							<Select defaultValue="popular">
								<SelectTrigger className="w-48">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="popular">Most Popular</SelectItem>
									<SelectItem value="price-low">Price: Low to High</SelectItem>
									<SelectItem value="price-high">Price: High to Low</SelectItem>
									<SelectItem value="rating">Highest Rated</SelectItem>
									<SelectItem value="newest">Newest First</SelectItem>
								</SelectContent>
							</Select>
						</div> */}

						{/* Events Grid */}
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
							{events.map((event, index) => (
								<Card
									key={event.id}
									className="group hover-lift overflow-hidden border-0 shadow-lg animate-slide-up"
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="relative">
										<Image
											src={event.image || "/placeholder.svg"}
											alt={event.title}
											width={400}
											height={300}
											className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
											{event.badge}
										</Badge>
										<Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
											<Heart className="h-4 w-4" />
										</Button>
										<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
											{event.duration}
										</div>
									</div>

									<CardContent className="p-6">
										<div className="flex items-start justify-between mb-2">
											<h3 className="text-lg font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors">
												{event.title}
											</h3>
											<div className="text-right">
												<div className="text-lg font-bold text-purple-600">{event.price}</div>
												<div className="text-sm text-muted-foreground line-through">{event.originalPrice}</div>
											</div>
										</div>

										{/* <p className="text-sm text-muted-foreground mb-3">by {event.vendor}</p> */}

										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center">
												<Star className="h-4 w-4 text-yellow-400 fill-current" />
												<span className="ml-1 font-medium text-sm">{event.rating}</span>
												<span className="ml-1 text-xs text-muted-foreground">({event.reviews})</span>
											</div>
											<div className="flex items-center text-xs text-muted-foreground">
												<MapPin className="h-3 w-3 mr-1" />
												{event.city}
											</div>
										</div>

										<div className="mb-4">
											<div className="flex items-center text-xs text-muted-foreground mb-2">
												<Users className="h-3 w-3 mr-1" />
												Age: {event.ageGroup}
											</div>
											<div className="flex flex-wrap gap-1">
												{event.includes.slice(0, 3).map((item, i) => (
													<Badge key={i} variant="secondary" className="text-xs">
														{item}
													</Badge>
												))}
												{event.includes.length > 3 && (
													<Badge variant="secondary" className="text-xs">
														+{event.includes.length - 3} more
													</Badge>
												)}
											</div>
										</div>

										<div className="flex flex-col gap-2 mt-8">
											<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
												Book Now
											</Button>
											<Button variant="outline" className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"	>
												More Details
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Load More */}
						<div className="text-center mt-12">
							<Button variant="outline" size="lg" className="px-8">
								Load More Events
							</Button>
						</div>
					</div>
				</div>
			</div>

			<section className="py-12 px-4 md:px-10">
				<div className="max-w-4xl mx-auto text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground">Entertainment Options</h2>
					<p className="text-muted-foreground mt-2">
						Add-on entertainment options to make your event extra special
					</p>
				</div>

				<Tabs defaultValue="performers" className="w-full max-w-4xl mx-auto">
					<TabsList className="grid grid-cols-3 bg-muted mb-8">
						<TabsTrigger value="performers">Performers</TabsTrigger>
						<TabsTrigger value="activities">Activities</TabsTrigger>
						<TabsTrigger value="rentals">Rentals</TabsTrigger>
					</TabsList>

					<TabsContent value="performers">
						<div className="grid md:grid-cols-2 gap-6">
							{performers.map((item, index) => (
								<Card key={index} className="rounded-xl shadow-sm border bg-background hover:shadow-md transition">
									<CardContent className="p-6">
										<div className="flex justify-between items-start mb-2">
											<h3 className="font-semibold text-2xl text-foreground">{item.title}</h3>
											<span className="text-xs px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
												{item.price}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">{item.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="activities">
						<div className="text-center text-muted-foreground">Activities content coming soon...</div>
					</TabsContent>

					<TabsContent value="rentals">
						<div className="text-center text-muted-foreground">Rental options coming soon...</div>
					</TabsContent>
				</Tabs>
			</section>
		</div>
	)
}
