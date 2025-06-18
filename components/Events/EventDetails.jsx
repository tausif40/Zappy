"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
	Star,
	Heart,
	MapPin,
	Users,
	Clock,
	CheckCircle,
	ArrowLeft,
	Share2,
	Phone,
	Mail,
	Award,
	Shield,
	Gift,
	MessageCircle,
	ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function EventDetails() {
	const params = useParams()
	const eventId = params.id
	const { toast } = useToast()
	const [ selectedImageIndex, setSelectedImageIndex ] = useState(0)

	// Mock event data - in real app, this would be fetched based on eventId
	const event = {
		id: eventId,
		title: "Princess Theme Birthday Party",
		vendor: {
			name: "Magic Moments Events",
			rating: 4.9,
			reviews: 156,
			experience: "8+ years",
			verified: true,
			avatar: "/placeholder.svg?height=80&width=80",
			phone: "+91 98765 43210",
			email: "contact@magicmoments.com",
		},
		rating: 4.9,
		reviews: 156,
		price: "₹8,999",
		originalPrice: "₹12,999",
		discount: "31% OFF",
		images: [
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
		],
		badge: "Most Popular",
		city: "Mumbai",
		duration: "3-4 hours",
		availableOn: "Weekends",
		maxGuests: "20-25 kids",
		description:
			"Transform your little princess's special day into a magical fairy tale experience! Our Princess Theme Birthday Party package includes everything needed to create an enchanting celebration that will make your child feel like royalty.",
		highlights: [
			"Professional princess performer for 2 hours",
			"Complete royal decoration setup",
			"Princess costume for birthday child",
			"Crown-making activity for all kids",
			"Royal photo booth with props",
			"Princess-themed games and activities",
			"Magical storytelling session",
			"Royal feast setup and coordination",
		],
		includes: [
			"Princess performer (2 hours)",
			"Complete decoration setup",
			"Birthday child costume",
			"Activity materials",
			"Photo booth props",
			"Game coordination",
			"Setup and cleanup",
			"Event coordination",
		],
		addOns: [
			{ name: "Professional Photography", price: "₹2,999", description: "2-hour photo session with edited photos" },
			{ name: "Princess Cake", price: "₹1,499", description: "Custom princess-themed cake (2kg)" },
			{ name: "Return Gifts", price: "₹199/child", description: "Princess-themed return gift bags" },
			{ name: "Face Painting", price: "₹999", description: "Professional face painting for all kids" },
		],
		availability: [
			{ date: "2024-02-10", slots: [ "10:00 AM", "2:00 PM", "4:00 PM" ] },
			{ date: "2024-02-11", slots: [ "11:00 AM", "3:00 PM" ] },
			{ date: "2024-02-17", slots: [ "10:00 AM", "1:00 PM", "4:00 PM" ] },
			{ date: "2024-02-18", slots: [ "12:00 PM", "3:00 PM" ] },
		],
		policies: {
			cancellation: "Free cancellation up to 48 hours before the event",
			payment: "50% advance payment required to confirm booking",
			weather: "Indoor backup arrangements available for outdoor bookings",
			changes: "Minor changes allowed up to 24 hours before the event",
		},
	}

	const reviews = [
		{
			name: "Priya Sharma",
			rating: 5,
			date: "2 weeks ago",
			comment:
				"Absolutely magical experience! My daughter felt like a real princess. The performer was amazing and kept all the kids engaged throughout. Highly recommend!",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 12,
		},
		{
			name: "Rajesh Kumar",
			rating: 5,
			date: "1 month ago",
			comment:
				"Perfect organization and attention to detail. The decoration was stunning and the activities were age-appropriate. Worth every penny!",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 8,
		},
		{
			name: "Anita Patel",
			rating: 4,
			date: "3 weeks ago",
			comment:
				"Great experience overall. The kids loved the princess performer and the activities. Only minor issue was the setup took a bit longer than expected.",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 5,
		},
	]

	const handleBookNow = () => {
		toast({
			title: "Booking Initiated!",
			description: "Redirecting to booking page...",
		})
	}

	const handleShare = () => {
		toast({
			title: "Link Copied!",
			description: "Event link copied to clipboard.",
		})
	}

	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Breadcrumb */}
			<div className="bg-muted/30 py-4">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center space-x-2 text-sm">
						<Link href="/" className="text-muted-foreground hover:text-foreground">
							Home
						</Link>
						<ChevronRight className="h-4 w-4 text-muted-foreground" />
						<Link href="/events" className="text-muted-foreground hover:text-foreground">
							Events
						</Link>
						<ChevronRight className="h-4 w-4 text-muted-foreground" />
						<span className="text-foreground">{event.title}</span>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Link href="/events">
						<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Events
						</Button>
					</Link>
					<Button variant="ghost" onClick={handleShare} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
						<Share2 className="mr-2 h-4 w-4" />
						Share
					</Button>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">

						{/* Event Details */}
						<Card className="shadow-lg overflow-hidden">
							<CardContent className="p-0 ">
								<div className="relative">
									<Image
										src={event.images[ selectedImageIndex ] || "/placeholder.svg"}
										alt={event.title}
										width={600}
										height={400}
										className="w-full h-96 object-cover"
									/>
									<Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
										{event.badge}
									</Badge>
									<Badge className="absolute top-4 right-4 bg-green-500 text-white border-0">{event.discount}</Badge>
								</div>

								<div className="p-8">
									<div className="flex items-start justify-between mb-6">
										<div>
											<h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
											<div className="flex items-center space-x-4 text-muted-foreground">
												<div className="flex items-center">
													<MapPin className="h-4 w-4 mr-1" />
													{event.city}
												</div>
												<div className="flex items-center">
													<Users className="h-4 w-4 mr-1" />
													{event.ageGroup}
												</div>
												<div className="flex items-center">
													<Clock className="h-4 w-4 mr-1" />
													{event.duration}
												</div>
											</div>
										</div>
										<div className="text-muted-foreground hover:text-red-500">
											<Heart className="h-6 w-6" />
										</div>
									</div>

									<div className="flex items-center space-x-4 mb-6">
										<div className="flex items-center">
											<Star className="h-5 w-5 text-yellow-400 fill-current" />
											<span className="ml-1 font-semibold">{event.rating}</span>
											<span className="ml-1 text-muted-foreground">({event.reviews} reviews)</span>
										</div>
										<Badge variant="secondary">Max {event.maxGuests}</Badge>
									</div>

									<p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

									<Tabs defaultValue="highlights" className="w-full">
										<TabsList className="grid w-full grid-cols-3">
											<TabsTrigger value="highlights">Highlights</TabsTrigger>
											<TabsTrigger value="includes">Includes</TabsTrigger>
											{/* <TabsTrigger value="addons">Add-ons</TabsTrigger> */}
											<TabsTrigger value="policies">Policies</TabsTrigger>
										</TabsList>

										<TabsContent value="highlights" className="mt-6">
											<div className="grid md:grid-cols-2 gap-4">
												{event.highlights.map((highlight, index) => (
													<div key={index} className="flex items-start space-x-3">
														<CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
														<span className="text-sm">{highlight}</span>
													</div>
												))}
											</div>
										</TabsContent>

										<TabsContent value="includes" className="mt-6">
											<div className="grid md:grid-cols-2 gap-4">
												{event.includes.map((item, index) => (
													<div key={index} className="flex items-start space-x-3">
														<CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
														<span className="text-sm">{item}</span>
													</div>
												))}
											</div>
										</TabsContent>

										<TabsContent value="addons" className="mt-6">
											<div className="space-y-4">
												{event.addOns.map((addon, index) => (
													<div key={index} className="flex items-center justify-between p-4 border rounded-lg">
														<div>
															<h4 className="font-medium">{addon.name}</h4>
															<p className="text-sm text-muted-foreground">{addon.description}</p>
														</div>
														<div className="text-right">
															<div className="font-semibold text-purple-600">{addon.price}</div>
															<Button size="sm" variant="outline">
																Add
															</Button>
														</div>
													</div>
												))}
											</div>
										</TabsContent>

										<TabsContent value="policies" className="mt-6">
											<div className="space-y-4">
												<div>
													<h4 className="font-medium mb-2">Cancellation Policy</h4>
													<p className="text-sm text-muted-foreground">{event.policies.cancellation}</p>
												</div>
												<div>
													<h4 className="font-medium mb-2">Payment Terms</h4>
													<p className="text-sm text-muted-foreground">{event.policies.payment}</p>
												</div>
												<div>
													<h4 className="font-medium mb-2">Weather Policy</h4>
													<p className="text-sm text-muted-foreground">{event.policies.weather}</p>
												</div>
												<div>
													<h4 className="font-medium mb-2">Changes Policy</h4>
													<p className="text-sm text-muted-foreground">{event.policies.changes}</p>
												</div>
											</div>
										</TabsContent>
									</Tabs>
								</div>
							</CardContent>
						</Card>

						{/* Reviews */}
						{/* <Card className="border shadow-lg mt-8">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
								<div className="space-y-6">
									{reviews.map((review, index) => (
										<div key={index}>
											<div className="flex items-start space-x-4">
												<Avatar>
													<AvatarImage src={review.avatar || "/placeholder.svg"} />
													<AvatarFallback>
														{review.name
															.split(" ")
															.map((n) => n[ 0 ])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center justify-between mb-2">
														<h4 className="font-semibold">{review.name}</h4>
														<span className="text-sm text-muted-foreground">{review.date}</span>
													</div>
													<div className="flex items-center mb-2">
														{[ ...Array(review.rating) ].map((_, i) => (
															<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
														))}
													</div>
													<p className="text-muted-foreground mb-3">{review.comment}</p>
													<div className="flex items-center space-x-4 text-sm text-muted-foreground">
														<button className="hover:text-foreground">Helpful ({review.helpful})</button>
														<button className="hover:text-foreground">Reply</button>
													</div>
												</div>
											</div>
											{index < reviews.length - 1 && <Separator className="mt-6" />}
										</div>
									))}
								</div>
								<div className="mt-6">
									<Button variant="outline" className="w-full">
										View All Reviews
									</Button>
								</div>
							</CardContent>
						</Card> */}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Pricing Card */}
						{/* sticky top-24 */}
						<Card className="shadow-lg">
							<CardContent className="p-6">
								<div className="text-center mb-6">
									<div className="flex items-center justify-center space-x-2 mb-2">
										<span className="text-3xl font-bold text-purple-600">{event.price}</span>
										<span className="text-lg text-muted-foreground line-through">{event.originalPrice}</span>
									</div>
									<Badge className="bg-green-100 text-green-700 border-0">{event.discount}</Badge>
								</div>

								<div className="space-y-4 mb-6">
									<Button
										onClick={handleBookNow}
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
									>
										Book Now
									</Button>
									{/* <Button variant="outline" className="w-full">
										<MessageCircle className="mr-2 h-4 w-4" />
										Chat with Vendor
									</Button> */}
								</div>

								<div className="space-y-3 text-sm">
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Duration:</span>
										<span className="font-medium">{event.duration}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Max Guests:</span>
										<span className="font-medium">{event.maxGuests}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Available on:</span>
										<span className="font-medium">{event.availableOn}</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Vendor Info */}
						<Card className="shadow-lg">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-4">About the Vendor</h3>
								<div className="flex items-start space-x-4 mb-4">
									<Avatar className="w-12 h-12 z-0">
										<AvatarImage src={event.vendor.avatar || "/placeholder.svg"} />
										<AvatarFallback>
											{event.vendor.name
												.split(" ")
												.map((n) => n[ 0 ])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<div className="flex items-center space-x-2 mb-1">
											<h4 className="font-semibold">{event.vendor.name}</h4>
											{event.vendor.verified && (
												<Badge className="bg-green-100 text-green-700 border-0 text-xs">
													<Shield className="w-3 h-3 mr-1" />
													Verified
												</Badge>
											)}
										</div>
										<div className="flex items-center space-x-4 text-sm text-muted-foreground">
											<div className="flex items-center">
												<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
												{event.vendor.rating} ({event.vendor.reviews})
											</div>
											<div className="flex items-center">
												<Award className="h-3 w-3 mr-1" />
												{event.vendor.experience}
											</div>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<Button variant="outline" className="w-full justify-start">
										<Phone className="mr-2 h-4 w-4" />
										{event.vendor.phone}
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="mr-2 h-4 w-4" />
										{event.vendor.email}
									</Button>
								</div>

								<div className="mt-4">
									<Link href={`/vendors/${event.vendor.name.toLowerCase().replace(/\s+/g, "-")}`}>
										<Button variant="secondary" className="w-full">
											View Vendor Profile
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>

						{/* Safety Features */}
						<Card className="shadow-lg">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-4">Safety & Trust</h3>
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<Shield className="h-5 w-5 text-green-500" />
										<span className="text-sm">Verified vendor</span>
									</div>
									<div className="flex items-center space-x-3">
										<CheckCircle className="h-5 w-5 text-green-500" />
										<span className="text-sm">Background checked</span>
									</div>
									<div className="flex items-center space-x-3">
										<Award className="h-5 w-5 text-green-500" />
										<span className="text-sm">Quality guaranteed</span>
									</div>
									<div className="flex items-center space-x-3">
										<Gift className="h-5 w-5 text-green-500" />
										<span className="text-sm">Secure payments</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

				</div>
			</div>
		</div>
	)
}
