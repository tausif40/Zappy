import React from 'react'
import Image from "next/image"
import { Star, MapPin, Phone, Mail, Calendar, Award, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function VendorCard() {

	const vendors = [
		{
			id: 1,
			name: "Magic Moments Events",
			specialization: "Princess & Fairy Tale Themes",
			rating: 4.9,
			reviews: 156,
			experience: "8+ years",
			location: "Mumbai, Maharashtra",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: true,
			completedEvents: 450,
			responseTime: "Within 2 hours",
			startingPrice: "₹8,999",
			services: [ "Birthday Parties", "Themed Events", "Photography", "Entertainment" ],
			description: "Specializing in creating magical princess and fairy tale experiences for children.",
		},
		{
			id: 2,
			name: "Hero Events Co.",
			specialization: "Superhero & Action Themes",
			rating: 4.8,
			reviews: 203,
			experience: "6+ years",
			location: "Delhi, NCR",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: false,
			completedEvents: 320,
			responseTime: "Within 4 hours",
			startingPrice: "₹9,499",
			services: [ "Superhero Parties", "Action Games", "Costume Rental", "Entertainment" ],
			description: "Action-packed superhero themed parties with professional entertainers.",
		},
		{
			id: 3,
			name: "Wild Celebrations",
			specialization: "Animal & Nature Themes",
			rating: 4.7,
			reviews: 89,
			experience: "5+ years",
			location: "Bangalore, Karnataka",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: true,
			completedEvents: 280,
			responseTime: "Within 3 hours",
			startingPrice: "₹7,999",
			services: [ "Jungle Themes", "Animal Shows", "Nature Activities", "Educational Events" ],
			description: "Bringing the wild to your backyard with amazing animal and nature themed events.",
		},
		{
			id: 4,
			name: "Dreamland Events",
			specialization: "Fantasy & Magical Themes",
			rating: 4.9,
			reviews: 124,
			experience: "7+ years",
			location: "Pune, Maharashtra",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: true,
			completedEvents: 380,
			responseTime: "Within 1 hour",
			startingPrice: "₹8,499",
			services: [ "Unicorn Parties", "Magic Shows", "Fantasy Themes", "Interactive Entertainment" ],
			description: "Creating dreamlike experiences with unicorns, magic, and fantasy themes.",
		},
		{
			id: 5,
			name: "Cosmic Kids",
			specialization: "Space & Science Themes",
			rating: 4.6,
			reviews: 67,
			experience: "4+ years",
			location: "Hyderabad, Telangana",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: false,
			completedEvents: 150,
			responseTime: "Within 6 hours",
			startingPrice: "₹10,999",
			services: [ "Space Themes", "Science Experiments", "Educational Shows", "Planetarium" ],
			description: "Educational and fun space-themed events with hands-on science activities.",
		},
		{
			id: 6,
			name: "Ice Queen Events",
			specialization: "Winter & Frozen Themes",
			rating: 4.8,
			reviews: 198,
			experience: "6+ years",
			location: "Chennai, Tamil Nadu",
			avatar: "/placeholder.svg?height=80&width=80",
			coverImage: "/placeholder.svg?height=200&width=400",
			verified: true,
			premium: true,
			completedEvents: 290,
			responseTime: "Within 2 hours",
			startingPrice: "₹9,999",
			services: [ "Frozen Themes", "Winter Wonderland", "Ice Shows", "Character Performances" ],
			description: "Bringing the magic of winter and Frozen themes to life with spectacular performances.",
		},
	]

	return (
		<>
			{vendors.map((vendor, index) => (
				<Card key={vendor.id} className="group overflow-hidden border-0 shadow-md">
					{/* Cover Image */}
					<div className="relative h-32">
						<Image
							src={vendor.coverImage || "/placeholder.svg"}
							alt={`${vendor.name} cover`}
							fill
							className="object-cover"
						/>
						{/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
						<div className="absolute top-4 right-4 flex gap-2">
							{vendor.verified && (
								<Badge className="bg-green-500 text-white border-0">
									<CheckCircle className="w-3 h-3 mr-1" />
									Verified
								</Badge>
							)}
							{vendor.premium && (
								<Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
									<Award className="w-3 h-3 mr-1" />
									Premium
								</Badge>
							)}
						</div>
					</div>

					<CardContent className="p-6">
						{/* Vendor Info */}
						<div className="flex items-start gap-4 mb-4">
							<Avatar className="w-20 h-20 border-4 border-card -mt-10 relative z-10">
								<AvatarImage src={vendor.avatar || "/placeholder.svg"} />
								<AvatarFallback>
									{vendor.name
										.split(" ")
										.map((n) => n[ 0 ])
										.join("")}
								</AvatarFallback>
							</Avatar>

							<div className="flex-1">
								<h3 className="text-xl font-bold transition-colors">{vendor.name}</h3>
								<p className="text-pink-600 font-medium mb-1">{vendor.specialization}</p>
								<div className="flex items-center text-sm text-muted-foreground">
									<MapPin className="w-4 h-4 mr-1" />
									{vendor.location}
								</div>
							</div>

							<div className="text-right">
								<div className="text-lg font-bold text-purple-600">{vendor.startingPrice}</div>
								<div className="text-xs text-muted-foreground">Starting from</div>
							</div>
						</div>

						{/* Description */}
						<p className="text-muted-foreground mb-4 text-sm line-clamp-2 md:line-clamp-3">{vendor.description}</p>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-4 mb-4 text-center">
							<div>
								<div className="flex items-center justify-center mb-1">
									<Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
									<span className="font-semibold">{vendor.rating}</span>
								</div>
								<div className="text-xs text-muted-foreground">{vendor.reviews} reviews</div>
							</div>
							<div>
								<div className="flex items-center justify-center mb-1">
									<Users className="w-4 h-4 text-purple-600 mr-1" />
									<span className="font-semibold">{vendor.completedEvents}</span>
								</div>
								<div className="text-xs text-muted-foreground">Events</div>
							</div>
							<div>
								<div className="flex items-center justify-center mb-1">
									<Calendar className="w-4 h-4 text-green-600 mr-1" />
									<span className="font-semibold">{vendor.experience}</span>
								</div>
								<div className="text-xs text-muted-foreground">Experience</div>
							</div>
						</div>

						{/* Services */}
						<div className="mb-4">
							<div className="flex flex-wrap gap-1">
								{vendor.services.map((service, i) => (
									<Badge key={i} variant="secondary" className="text-xs">
										{service}
									</Badge>
								))}
							</div>
						</div>

						{/* Response Time */}
						<div className="flex items-center justify-between mb-4 text-sm">
							<span className="text-muted-foreground">Response time:</span>
							<span className="font-medium text-green-600">{vendor.responseTime}</span>
						</div>

						{/* Actions */}
						<div className="flex gap-2">
							<Button className="flex-1 text-white">
								View Profile
							</Button>
							<Button variant="outline" size="icon">
								<Phone className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon">
								<Mail className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	)
}

export default VendorCard