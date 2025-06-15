"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
	Heart,
	Star,
	MapPin,
	Users,
	Calendar,
	Phone,
	MessageSquare,
	Eye,
	Search,
	Grid3X3,
	List,
	Trash2,
	Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserFavorites() {
	const [ searchQuery, setSearchQuery ] = useState("")
	const [ categoryFilter, setCategoryFilter ] = useState("all")
	const [ viewMode, setViewMode ] = useState("grid")

	const favoriteVendors = [
		{
			id: 1,
			name: "Magic Moments Events",
			specialization: "Princess & Fairy Tale Themes",
			rating: 4.9,
			reviews: 156,
			bookings: 3,
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=300",
			location: "Mumbai, Maharashtra",
			priceRange: "₹8,000 - ₹15,000",
			responseTime: "2 hours",
			completedEvents: 450,
			verified: true,
			category: "event-planning",
			description:
				"Specializing in magical princess parties with complete theme setups, entertainment, and memorable experiences.",
			services: [ "Decorations", "Entertainment", "Photography", "Catering" ],
			addedDate: "2024-01-15",
		},
		{
			id: 2,
			name: "Hero Events Co.",
			specialization: "Superhero & Action Themes",
			rating: 4.8,
			reviews: 89,
			bookings: 2,
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=300",
			location: "Mumbai, Maharashtra",
			priceRange: "₹9,000 - ₹18,000",
			responseTime: "1 hour",
			completedEvents: 320,
			verified: true,
			category: "event-planning",
			description: "Action-packed superhero themed parties with costumes, activities, and thrilling entertainment.",
			services: [ "Costumes", "Activities", "Decorations", "Games" ],
			addedDate: "2024-01-10",
		},
		{
			id: 3,
			name: "Wild Celebrations",
			specialization: "Animal & Nature Themes",
			rating: 4.7,
			reviews: 67,
			bookings: 1,
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=300",
			location: "Mumbai, Maharashtra",
			priceRange: "₹7,000 - ₹12,000",
			responseTime: "3 hours",
			completedEvents: 280,
			verified: true,
			category: "event-planning",
			description: "Nature and animal themed parties with educational activities and eco-friendly decorations.",
			services: [ "Eco Decorations", "Educational Games", "Face Painting", "Music" ],
			addedDate: "2024-01-05",
		},
	]

	const favoriteEvents = [
		{
			id: 1,
			title: "Fairy Tale Magic Workshop",
			vendor: "Enchanted Events",
			price: "₹9,999",
			originalPrice: "₹12,999",
			image: "/placeholder.svg?height=200&width=300",
			rating: 4.9,
			reviews: 45,
			location: "Multiple Locations",
			duration: "3 hours",
			ageGroup: "4-10 years",
			category: "workshop",
			description: "Interactive fairy tale workshop with storytelling, crafts, and magical activities.",
			addedDate: "2024-01-20",
		},
		{
			id: 2,
			title: "Science Explorer Day",
			vendor: "Curious Minds",
			price: "₹7,499",
			originalPrice: "₹9,999",
			image: "/placeholder.svg?height=200&width=300",
			rating: 4.7,
			reviews: 32,
			location: "Home Service Available",
			duration: "4 hours",
			ageGroup: "6-12 years",
			category: "educational",
			description: "Hands-on science experiments and activities to spark curiosity and learning.",
			addedDate: "2024-01-18",
		},
		{
			id: 3,
			title: "Sports Adventure Camp",
			vendor: "Active Kids",
			price: "₹8,499",
			originalPrice: "₹10,999",
			image: "/placeholder.svg?height=200&width=300",
			rating: 4.8,
			reviews: 28,
			location: "Outdoor Venues",
			duration: "5 hours",
			ageGroup: "5-14 years",
			category: "sports",
			description: "Multi-sport activities and team games for active kids and fitness enthusiasts.",
			addedDate: "2024-01-12",
		},
	]

	const filteredVendors = favoriteVendors.filter((vendor) => {
		const matchesSearch =
			vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			vendor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
		return matchesSearch && matchesCategory
	})

	const filteredEvents = favoriteEvents.filter((event) => {
		const matchesSearch =
			event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			event.vendor.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
		return matchesSearch && matchesCategory
	})

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
						My Favorites ❤️
					</h1>
					<p className="text-muted-foreground">Your saved vendors and events for quick access</p>
				</div>

				{/* Filters */}
				<Card className="border-0 shadow-lg mb-8">
					<CardContent className="p-6">
						<div className="flex flex-col md:flex-row gap-4 items-center">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Search favorites..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>
							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
								<SelectTrigger className="w-full md:w-48">
									<SelectValue placeholder="Filter by category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									<SelectItem value="event-planning">Event Planning</SelectItem>
									<SelectItem value="workshop">Workshops</SelectItem>
									<SelectItem value="educational">Educational</SelectItem>
									<SelectItem value="sports">Sports</SelectItem>
								</SelectContent>
							</Select>
							<div className="flex items-center space-x-2">
								<Button
									variant={viewMode === "grid" ? "default" : "outline"}
									size="sm"
									onClick={() => setViewMode("grid")}
								>
									<Grid3X3 className="h-4 w-4" />
								</Button>
								<Button
									variant={viewMode === "list" ? "default" : "outline"}
									size="sm"
									onClick={() => setViewMode("list")}
								>
									<List className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Favorites Tabs */}
				<Tabs defaultValue="vendors" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2 lg:w-96">
						<TabsTrigger value="vendors" className="flex items-center">
							<Users className="h-4 w-4 mr-2" />
							Vendors ({filteredVendors.length})
						</TabsTrigger>
						<TabsTrigger value="events" className="flex items-center">
							<Calendar className="h-4 w-4 mr-2" />
							Events ({filteredEvents.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="vendors">
						{viewMode === "grid" ? (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredVendors.map((vendor) => (
									<Card
										key={vendor.id}
										className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
									>
										<div className="relative">
											<Image
												src={vendor.coverImage || "/placeholder.svg"}
												alt={vendor.name}
												width={300}
												height={200}
												className="w-full h-48 object-cover"
											/>
											<div className="absolute top-3 right-3 flex space-x-2">
												<Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white shadow-lg">
													<Share2 className="h-4 w-4" />
												</Button>
												<Button
													size="icon"
													variant="ghost"
													className="bg-white/80 hover:bg-white shadow-lg text-red-500"
												>
													<Heart className="h-4 w-4 fill-current" />
												</Button>
											</div>
											{vendor.verified && (
												<Badge className="absolute top-3 left-3 bg-green-500 text-white border-0">Verified</Badge>
											)}
										</div>
										<CardContent className="p-6">
											<div className="flex items-start space-x-4 mb-4">
												<Avatar className="w-12 h-12 border-2 border-white shadow-lg">
													<AvatarImage src={vendor.avatar || "/placeholder.svg"} />
													<AvatarFallback>
														{vendor.name
															.split(" ")
															.map((n) => n[ 0 ])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
													<p className="text-sm text-muted-foreground mb-2">{vendor.specialization}</p>
													<div className="flex items-center space-x-4 text-sm">
														<div className="flex items-center">
															<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
															<span className="font-medium">{vendor.rating}</span>
															<span className="text-muted-foreground ml-1">({vendor.reviews})</span>
														</div>
														<div className="flex items-center text-muted-foreground">
															<MapPin className="h-3 w-3 mr-1" />
															{vendor.location.split(",")[ 0 ]}
														</div>
													</div>
												</div>
											</div>

											<p className="text-sm text-muted-foreground mb-4">{vendor.description}</p>

											<div className="space-y-3 mb-4">
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">Price Range</span>
													<span className="font-medium text-purple-600">{vendor.priceRange}</span>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">Response Time</span>
													<span className="font-medium">{vendor.responseTime}</span>
												</div>
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">Completed Events</span>
													<span className="font-medium">{vendor.completedEvents}</span>
												</div>
											</div>

											<div className="flex flex-wrap gap-2 mb-4">
												{vendor.services.slice(0, 3).map((service, index) => (
													<Badge key={index} variant="secondary" className="text-xs">
														{service}
													</Badge>
												))}
												{vendor.services.length > 3 && (
													<Badge variant="secondary" className="text-xs">
														+{vendor.services.length - 3} more
													</Badge>
												)}
											</div>

											<div className="flex space-x-2">
												<Button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
													<Eye className="h-3 w-3 mr-1" />
													View Profile
												</Button>
												<Button variant="outline" size="icon">
													<Phone className="h-4 w-4" />
												</Button>
												<Button variant="outline" size="icon">
													<MessageSquare className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className="space-y-4">
								{filteredVendors.map((vendor) => (
									<Card key={vendor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
										<CardContent className="p-6">
											<div className="flex items-center space-x-6">
												<Avatar className="w-16 h-16 border-2 border-white shadow-lg">
													<AvatarImage src={vendor.avatar || "/placeholder.svg"} />
													<AvatarFallback>
														{vendor.name
															.split(" ")
															.map((n) => n[ 0 ])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-start justify-between mb-2">
														<div>
															<h3 className="font-bold text-xl mb-1">{vendor.name}</h3>
															<p className="text-muted-foreground mb-2">{vendor.specialization}</p>
															<div className="flex items-center space-x-4 text-sm">
																<div className="flex items-center">
																	<Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
																	<span className="font-medium">{vendor.rating}</span>
																	<span className="text-muted-foreground ml-1">({vendor.reviews} reviews)</span>
																</div>
																<div className="flex items-center text-muted-foreground">
																	<MapPin className="h-4 w-4 mr-1" />
																	{vendor.location}
																</div>
															</div>
														</div>
														<div className="flex items-center space-x-2">
															<Button size="icon" variant="ghost" className="text-red-500">
																<Heart className="h-4 w-4 fill-current" />
															</Button>
															<Button size="icon" variant="ghost">
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
													<p className="text-sm text-muted-foreground mb-3">{vendor.description}</p>
													<div className="flex items-center justify-between">
														<div className="flex space-x-6 text-sm">
															<div>
																<span className="text-muted-foreground">Price: </span>
																<span className="font-medium text-purple-600">{vendor.priceRange}</span>
															</div>
															<div>
																<span className="text-muted-foreground">Response: </span>
																<span className="font-medium">{vendor.responseTime}</span>
															</div>
															<div>
																<span className="text-muted-foreground">Events: </span>
																<span className="font-medium">{vendor.completedEvents}</span>
															</div>
														</div>
														<div className="flex space-x-2">
															<Button
																size="sm"
																className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
															>
																View Profile
															</Button>
															<Button size="sm" variant="outline">
																<Phone className="h-3 w-3 mr-1" />
																Contact
															</Button>
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</TabsContent>

					<TabsContent value="events">
						{viewMode === "grid" ? (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredEvents.map((event) => (
									<Card
										key={event.id}
										className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
									>
										<div className="relative">
											<Image
												src={event.image || "/placeholder.svg"}
												alt={event.title}
												width={300}
												height={200}
												className="w-full h-48 object-cover"
											/>
											<div className="absolute top-3 right-3 flex space-x-2">
												<Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white shadow-lg">
													<Share2 className="h-4 w-4" />
												</Button>
												<Button
													size="icon"
													variant="ghost"
													className="bg-white/80 hover:bg-white shadow-lg text-red-500"
												>
													<Heart className="h-4 w-4 fill-current" />
												</Button>
											</div>
											<Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
												{Math.round(
													((Number.parseFloat(event.originalPrice.replace("₹", "").replace(",", "")) -
														Number.parseFloat(event.price.replace("₹", "").replace(",", ""))) /
														Number.parseFloat(event.originalPrice.replace("₹", "").replace(",", ""))) *
													100,
												)}
												% OFF
											</Badge>
										</div>
										<CardContent className="p-6">
											<h3 className="font-bold text-lg mb-2">{event.title}</h3>
											<p className="text-sm text-muted-foreground mb-3">by {event.vendor}</p>

											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center space-x-2">
													<span className="text-xl font-bold text-purple-600">{event.price}</span>
													<span className="text-sm text-muted-foreground line-through">{event.originalPrice}</span>
												</div>
												<div className="flex items-center">
													<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
													<span className="text-sm font-medium">{event.rating}</span>
													<span className="text-xs text-muted-foreground ml-1">({event.reviews})</span>
												</div>
											</div>

											<p className="text-sm text-muted-foreground mb-4">{event.description}</p>

											<div className="space-y-2 mb-4 text-sm">
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">Duration</span>
													<span className="font-medium">{event.duration}</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">Age Group</span>
													<span className="font-medium">{event.ageGroup}</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">Location</span>
													<span className="font-medium text-xs">{event.location}</span>
												</div>
											</div>

											<div className="flex space-x-2">
												<Button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
													Book Now
												</Button>
												<Button variant="outline" size="icon">
													<Eye className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className="space-y-4">
								{filteredEvents.map((event) => (
									<Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
										<CardContent className="p-6">
											<div className="flex items-center space-x-6">
												<Image
													src={event.image || "/placeholder.svg"}
													alt={event.title}
													width={120}
													height={80}
													className="rounded-lg object-cover w-32 h-20"
												/>
												<div className="flex-1">
													<div className="flex items-start justify-between mb-2">
														<div>
															<h3 className="font-bold text-xl mb-1">{event.title}</h3>
															<p className="text-muted-foreground mb-2">by {event.vendor}</p>
															<div className="flex items-center space-x-4 text-sm">
																<div className="flex items-center">
																	<Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
																	<span className="font-medium">{event.rating}</span>
																	<span className="text-muted-foreground ml-1">({event.reviews} reviews)</span>
																</div>
																<div className="flex items-center text-muted-foreground">
																	<MapPin className="h-4 w-4 mr-1" />
																	{event.location}
																</div>
															</div>
														</div>
														<div className="flex items-center space-x-2">
															<Button size="icon" variant="ghost" className="text-red-500">
																<Heart className="h-4 w-4 fill-current" />
															</Button>
															<Button size="icon" variant="ghost">
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
													<p className="text-sm text-muted-foreground mb-3">{event.description}</p>
													<div className="flex items-center justify-between">
														<div className="flex space-x-6 text-sm">
															<div>
																<span className="text-muted-foreground">Price: </span>
																<span className="font-bold text-purple-600">{event.price}</span>
																<span className="text-muted-foreground line-through ml-2">{event.originalPrice}</span>
															</div>
															<div>
																<span className="text-muted-foreground">Duration: </span>
																<span className="font-medium">{event.duration}</span>
															</div>
															<div>
																<span className="text-muted-foreground">Age: </span>
																<span className="font-medium">{event.ageGroup}</span>
															</div>
														</div>
														<div className="flex space-x-2">
															<Button
																size="sm"
																className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
															>
																Book Now
															</Button>
															<Button size="sm" variant="outline">
																<Eye className="h-3 w-3 mr-1" />
																View
															</Button>
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</TabsContent>
				</Tabs>

				{/* Empty State */}
				{filteredVendors.length === 0 && filteredEvents.length === 0 && (
					<Card className="border-0 shadow-lg">
						<CardContent className="p-12 text-center">
							<Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-xl font-semibold mb-2">No favorites found</h3>
							<p className="text-muted-foreground mb-6">
								{searchQuery || categoryFilter !== "all"
									? "Try adjusting your search or filters"
									: "Start adding vendors and events to your favorites"}
							</p>
							<div className="flex justify-center space-x-4">
								<Link href="/vendors">
									<Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
										Browse Vendors
									</Button>
								</Link>
								<Link href="/kids-events">
									<Button variant="outline">Browse Events</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
