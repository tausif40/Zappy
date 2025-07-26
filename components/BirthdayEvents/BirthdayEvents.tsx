"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Users, SlidersHorizontal, Check, Smile, GraduationCap, Wine, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import EventFilter from "./EventFilter"

export default function BirthdayEvents() {
	const [searchQuery, setSearchQuery] = useState("")

	const [activeButton, setActiveButton] = useState('Kids');

	const events = [
		{
			id: 1,
			title: "Princess Theme Party",
			vendor: "Magic Moments",
			time: "2 hour",
			rating: 4.9,
			reviews: 156,
			price: "₹8,999",
			originalPrice: "₹12,999",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Most Popular",
			city: "Mumbai",
			discount: "31% OFF",
			ageGroup: "3-9 years",
			description: "A magical tea party with princess characters, tiara crafting, and royal games.",
			options: [
				"Princess character appearances",
				"Royal tea party setup",
				"Tiara crafting workshop",
				"Storytime with the Queen"
			]
		},
		{
			id: 2,
			title: "Superhero Adventure Party",
			vendor: "Hero Events",
			time: "3 hour",
			rating: 4.8,
			reviews: 201,
			price: "₹10,499",
			originalPrice: "₹14,999",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Editor's Choice",
			city: "Delhi",
			discount: "30% OFF",
			ageGroup: "12-16 years",
			description: "Action-packed party with superhero training, obstacle courses, and themed games.",
			options: [
				"Superhero training camp",
				"Obstacle course setup",
				"Hero photo booth",
				"Power badge giveaways"
			]
		},
		{
			id: 3,
			title: "Under the Sea Bash",
			vendor: "Aqua Parties",
			time: "2.5 hour",
			rating: 4.7,
			reviews: 132,
			price: "₹7,999",
			originalPrice: "₹10,999",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Top Rated",
			city: "Bangalore",
			discount: "27% OFF",
			ageGroup: "2-5 years",
			description: "Dive into a mermaid-themed party with ocean decor and underwater games.",
			options: [
				"Mermaid character meet & greet",
				"Ocean-themed decorations",
				"Bubble show",
				"Treasure hunt game"
			]
		},
		{
			id: 4,
			title: "Carnival Fun Fair",
			vendor: "Festive Feels",
			time: "3 hour",
			rating: 4.6,
			reviews: 98,
			price: "₹11,000",
			originalPrice: "₹15,000",
			image: "/placeholder.svg?height=200&width=300",
			badge: "New Arrival",
			city: "Hyderabad",
			discount: "26% OFF",
			ageGroup: "20-25 years",
			description: "Exciting carnival party with game booths, popcorn machines, and entertainers.",
			options: [
				"Game booths",
				"Popcorn and candy floss",
				"Juggler & clown acts",
				"Colorful decorations"
			]
		},
		{
			id: 5,
			title: "Science Party Experiment",
			vendor: "Smart Sparks",
			time: "1.5 hour",
			rating: 4.9,
			reviews: 122,
			price: "₹9,500",
			originalPrice: "₹13,000",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Educational",
			city: "Chennai",
			discount: "27% OFF",
			ageGroup: "3-9 years",
			description: "Fun and educational science party with live experiments and take-home kits.",
			options: [
				"Live science demos",
				"Experiment kits for kids",
				"Lab coat costumes",
				"Dry ice effects"
			]
		},
		{
			id: 6,
			title: "Jungle Safari Party",
			vendor: "Wild Kids",
			time: "2 hour",
			rating: 4.5,
			reviews: 77,
			price: "₹6,999",
			originalPrice: "₹9,499",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Budget Friendly",
			city: "Pune",
			discount: "26% OFF",
			ageGroup: "13-19 years",
			description: "An animal-themed adventure party with jungle decor and safari games.",
			options: [
				"Safari tent setup",
				"Animal mascot appearances",
				"Jungle scavenger hunt",
				"Nature craft station"
			]
		},
		{
			id: 7,
			title: "DIY Art & Craft Party",
			vendor: "Crafty Hands",
			time: "1.5 hour",
			rating: 4.6,
			reviews: 84,
			price: "₹5,499",
			originalPrice: "₹7,999",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Creative Pick",
			city: "Ahmedabad",
			discount: "31% OFF",
			ageGroup: "3-9 years",
			description: "Creative party with painting, clay modeling, and fun DIY crafts for all ages.",
			options: [
				"All materials included",
				"Guided art sessions",
				"Display corner for art",
				"Take-home art kits"
			]
		},
		{
			id: 8,
			title: "Glow in the Dark Dance Party",
			vendor: "GlowUp Events",
			time: "2 hour",
			rating: 4.8,
			reviews: 109,
			price: "₹9,999",
			originalPrice: "₹13,499",
			image: "/placeholder.svg?height=200&width=300",
			badge: "Party Vibe",
			city: "Kolkata",
			discount: "26% OFF",
			ageGroup: "10-12 years",
			description: "High-energy glow party with neon lights, glow accessories, and a dance floor.",
			options: [
				"Glow accessories for guests",
				"Live DJ with lighting",
				"Neon face paint station",
				"LED dance floor"
			]
		}
	]

	const event = [
		{
			id: 1,
			title: "Princess Theme Birthday Party",
			vendor: "Magic Moments Events",
			rating: 4.9,
			reviews: 156,
			price: "₹8,999",
			originalPrice: "₹12,999",
			discount: "31% OFF",
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
			discount: "29% OFF",
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
			discount: "20% OFF",
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
			reviews: 124,
			price: "₹8,499",
			originalPrice: "₹11,999",
			discount: "13% OFF",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Premium",
			city: "Pune",
			category: "birthday",
			rating: 4.9,
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
			discount: "06% OFF",
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
			discount: "40% OFF",
			image: "/placeholder.svg?height=300&width=400",
			badge: "Seasonal",
			city: "Chennai",
			category: "themed",
			ageGroup: "3-10 years",
			duration: "3.5 hours",
			includes: ["Elsa Performer", "Snow Machine", "Crafts", "Themed Cake"],
		},
	]

	const AgeGroup = [
		{
			id: 'Kids',
			text: 'Kids (1-12)',
			icon: Smile,
		},
		{
			id: 'Teens',
			text: 'Teens (13-19)',
			icon: GraduationCap,
		},
		{
			id: 'Adults',
			text: 'Adults (20+)',
			icon: Wine,
		},
		{
			id: 'Milestone',
			text: 'Milestone',
			icon: Crown,
		},
	];


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
		<div className="min-h-screen py-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Birthday Events
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Discover amazing themed parties and events designed to create magical memories for you
						</p>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto flex flex-wrap justify-center mt-6 gap-4">
							{/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search for themes, vendors, or locations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-6 text-lg border-2 focus:border-purple-500 rounded-full"
							/> */}
							{AgeGroup.map((button) => {
								// Determine if the current button is active
								const isActive = activeButton === button.id;
								return (
									<Button key={button.id} onClick={() => setActiveButton(button.id)}
										className={`${isActive ? 'bg-purple-400 text-white shadow-md'
											: 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50 hover:border-purple-400'}`
										}>
										{/* Render the icon component */}
										<button.icon className="w-5 h-5 md:w-6 md:h-6" />
										<span>{button.text}</span>
									</Button>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar - Desktop */}
					<div className="hidden lg:block w-72 h-96 space-y-6 sticky top-20">
						<EventFilter />
					</div>

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
										<EventFilter />
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
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
							{events.map((event, index) => (
								<Card
									key={event?.id}
									className="group hover:shadow-md transition-all duration-300 overflow-hidden bg-white dark:bg-card"
								>
									<div className="relative">
										<Image
											src={event?.image || "/placeholder.svg"}
											alt={event?.title}
											width={300}
											height={200}
											className="w-full h-48 object-cover transition-transform duration-300"
										/>
										<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
											{event?.badge}
										</Badge>

										{/* <div className="absolute top-3 right-3">
											<Heart className="h-4 w-4" />
										</div> */}
										<Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">{event?.discount}</Badge>

										<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
											{event.time}
										</div>
									</div>
									<CardContent className="p-6">
										<div className="flex items-center justify-between mb-2">
											{/* <Badge variant='outline' className="border-0 font-medium bg-pink-200 text-pink-800">{event?.time}</Badge> */}
											<p className="text-muted-foreground text-xl font-semibold">Price: </p>
											<div className="text-right flex gap-2 items-baseline">
												<div className="text-sm text-muted-foreground line-through">{event?.originalPrice}</div>
												<span className="text-xl font-bold text-purple-600">{event?.price}</span>
											</div>
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{event?.title}</h3>
										<p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event?.description}</p>

										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center text-sm text-muted-foreground">
												<Users className="h-3 w-3 mr-1 text-purple-600" />
												<span className="font-semibold">Age:&nbsp;</span> {event.ageGroup}
											</div>
											<div className="flex items-center">
												<Star className="h-4 w-4 text-yellow-400 fill-current" />
												<span className="ml-1 font-medium text-sm">{event.rating}</span>
												<span className="ml-1 text-xs text-muted-foreground">({event.reviews})</span>
											</div>
										</div>

										<div className="space-y-2">
											{event?.options?.slice(0, 3).map((option, i) => (
												<div key={i} className="flex text-muted-foreground items-center text-sm">
													<Check className="w-4 h-4 mr-2 text-green-500" />
													{option}
												</div>
											))}

											{event?.options?.length > 3 && (
												<div className="flex text-primary hover:text-purple-600 cursor-pointer text-sm">
													+{event.options.length - 3} more features
												</div>
											)}
										</div>
										<div className="flex flex-col gap-2 mt-4">
											<Link href={`/birthday/details/${event.id}`}>
												<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
													Book Now
												</Button>
											</Link>
											{/* <Link href={`/birthday/details/${event.id}`}>
												<Button variant="outline" className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"	>
													More Details
												</Button>
											</Link> */}
										</div>
									</CardContent>
								</Card>
							))}
							{/* {event.map((event, index) => (
								<Card
									key={event.id}
									className="group hover:shadow-md transition-all duration-300 overflow-hidden bg-white dark:bg-card"
								>
									<div className="relative">
										<Image
											src={event.image || "/placeholder.svg"}
											alt={event.title}
											width={400}
											height={300}
											className="w-full h-48 object-cover transition-transform duration-300"
										/>
										<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
											{event.badge}
										</Badge>
										<button className="absolute top-3 right-3">
											<Heart className="h-4 w-4" />
										</button>
										<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
											{event.duration}
										</div>
									</div>

									<CardContent className="p-5">
										<div className="flex items-start justify-between mb-2">
											<h3 className="text-lg font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors">
												{event.title}
											</h3>
										</div>
										<div className="text-right flex gap-2 justify-between">
											<div className="flex items-baseline gap-2">
												<p className="text-xl font-semibold">Price: </p><p className="text-xl font-bold text-purple-600">{event?.price}</p>
												<div className="text-sm text-muted-foreground line-through">{event?.originalPrice}</div>
											</div>
										</div>


										<p className="text-sm text-muted-foreground mb-3">by {event.vendor}</p>

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

										<div className="flex flex-col gap-2 mt-4">
											<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
												Book Now
											</Button>
											<Link href={`/event-details/${event.id}`}>
												<Button variant="outline" className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"	>
													More Details
												</Button>
											</Link>
										</div>
									</CardContent>
								</Card>
							))} */}
						</div>

						{/* Load More */}
						<div className="text-center mt-12">
							<Button variant="secondary" size="lg" className="px-8">
								Load More Events
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* <section className="mt-8 py-12 px-4 md:px-10 bg-secondary">
				<div className="max-w-4xl mx-auto text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground">Entertainment Options</h2>
					<p className="text-muted-foreground mt-2">
						Add-on entertainment options to make your event extra special
					</p>
				</div>

				<Tabs defaultValue="performers" className="w-full max-w-4xl mx-auto">
					<TabsList className="grid grid-cols-3 mb-8 bg-gray-300 dark:bg-gray-600">
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
			</section> */}
		</div>
	)
}
