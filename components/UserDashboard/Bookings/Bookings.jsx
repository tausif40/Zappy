"use client"
import Image from "next/image"
import { useState } from "react"
import {
	Calendar,
	MapPin,
	Star,
	Users,
	Clock,
	CheckCircle,
	AlertCircle,
	XCircle,
	Eye,
	Phone,
	MessageSquare,
	Download,
	Search,
	RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserBookings() {
	const [ searchQuery, setSearchQuery ] = useState("")
	const [ statusFilter, setStatusFilter ] = useState("all")

	const bookings = [
		{
			id: "BK001",
			title: "Princess Theme Party",
			vendor: "Magic Moments Events",
			vendorAvatar: "/placeholder.svg?height=40&width=40",
			date: "2024-02-15",
			time: "2:00 PM",
			status: "confirmed",
			amount: "₹8,999",
			image: "/placeholder.svg?height=100&width=150",
			guests: 15,
			location: "Home, Bandra West",
			bookingDate: "2024-01-20",
			vendorPhone: "+91 98765 43210",
			vendorRating: 4.9,
			description: "Complete princess theme party setup with decorations, games, and entertainment.",
			services: [ "Decorations", "Games", "Entertainment", "Photography" ],
		},
		{
			id: "BK002",
			title: "Superhero Adventure",
			vendor: "Hero Events Co.",
			vendorAvatar: "/placeholder.svg?height=40&width=40",
			date: "2024-01-28",
			time: "11:00 AM",
			status: "completed",
			amount: "₹9,499",
			image: "/placeholder.svg?height=100&width=150",
			guests: 20,
			location: "Community Hall, Andheri",
			bookingDate: "2024-01-10",
			vendorPhone: "+91 98765 43211",
			vendorRating: 4.8,
			description: "Action-packed superhero themed party with costumes and activities.",
			services: [ "Costumes", "Activities", "Decorations", "Catering" ],
		},
		{
			id: "BK003",
			title: "Jungle Safari Party",
			vendor: "Wild Celebrations",
			vendorAvatar: "/placeholder.svg?height=40&width=40",
			date: "2024-01-10",
			time: "3:00 PM",
			status: "completed",
			amount: "₹7,999",
			image: "/placeholder.svg?height=100&width=150",
			guests: 12,
			location: "Garden Area, Powai",
			bookingDate: "2023-12-25",
			vendorPhone: "+91 98765 43212",
			vendorRating: 4.7,
			description: "Jungle themed adventure party with animal decorations and safari games.",
			services: [ "Decorations", "Games", "Face Painting", "Music" ],
		},
		{
			id: "BK004",
			title: "Space Explorer Mission",
			vendor: "Cosmic Kids",
			vendorAvatar: "/placeholder.svg?height=40&width=40",
			date: "2024-03-05",
			time: "10:00 AM",
			status: "pending",
			amount: "₹12,499",
			image: "/placeholder.svg?height=100&width=150",
			guests: 25,
			location: "School Auditorium, Malad",
			bookingDate: "2024-02-01",
			vendorPhone: "+91 98765 43213",
			vendorRating: 4.9,
			description: "Interactive space exploration party with planetarium show and activities.",
			services: [ "Planetarium Show", "Activities", "Decorations", "Goodie Bags" ],
		},
		{
			id: "BK005",
			title: "Art & Craft Workshop",
			vendor: "Creative Minds",
			vendorAvatar: "/placeholder.svg?height=40&width=40",
			date: "2024-01-05",
			time: "4:00 PM",
			status: "cancelled",
			amount: "₹5,999",
			image: "/placeholder.svg?height=100&width=150",
			guests: 10,
			location: "Home, Juhu",
			bookingDate: "2023-12-20",
			vendorPhone: "+91 98765 43214",
			vendorRating: 4.6,
			description: "Creative art and craft workshop for kids with all materials included.",
			services: [ "Art Supplies", "Instructor", "Take-home Crafts", "Snacks" ],
		},
	]

	const getStatusColor = (status) => {
		switch (status) {
			case "confirmed":
				return "bg-green-100 text-green-700 border-green-200"
			case "pending":
				return "bg-yellow-100 text-yellow-700 border-yellow-200"
			case "completed":
				return "bg-blue-100 text-blue-700 border-blue-200"
			case "cancelled":
				return "bg-red-100 text-red-700 border-red-200"
			default:
				return "bg-gray-100 text-gray-700 border-gray-200"
		}
	}

	const getStatusIcon = (status) => {
		switch (status) {
			case "confirmed":
				return <CheckCircle className="h-4 w-4" />
			case "pending":
				return <Clock className="h-4 w-4" />
			case "completed":
				return <CheckCircle className="h-4 w-4" />
			case "cancelled":
				return <XCircle className="h-4 w-4" />
			default:
				return <AlertCircle className="h-4 w-4" />
		}
	}

	const filteredBookings = bookings.filter((booking) => {
		const matchesSearch =
			booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.vendor.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesStatus = statusFilter === "all" || booking.status === statusFilter
		return matchesSearch && matchesStatus
	})

	const upcomingBookings = filteredBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
	const pastBookings = filteredBookings.filter((b) => b.status === "completed" || b.status === "cancelled")

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
						My Bookings
					</h1>
					<p className="text-muted-foreground">Manage and track all your event bookings</p>
				</div>

				{/* Filters */}
				<Card className="border-0 shadow-lg mb-8">
					<CardContent className="p-6">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Search bookings..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-full md:w-48">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="confirmed">Confirmed</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="cancelled">Cancelled</SelectItem>
								</SelectContent>
							</Select>
							<Button variant="outline" className="flex items-center">
								<RefreshCw className="h-4 w-4 mr-2" />
								Refresh
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Booking Tabs */}
				<Tabs defaultValue="upcoming" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2 lg:w-96">
						<TabsTrigger value="upcoming" className="flex items-center">
							<Calendar className="h-4 w-4 mr-2" />
							Upcoming ({upcomingBookings.length})
						</TabsTrigger>
						<TabsTrigger value="past" className="flex items-center">
							<Clock className="h-4 w-4 mr-2" />
							Past ({pastBookings.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="upcoming">
						<div className="space-y-6">
							{upcomingBookings.map((booking) => (
								<Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
									<CardContent className="p-6">
										<div className="flex flex-col lg:flex-row gap-6">
											{/* Image */}
											<div className="relative">
												<Image
													src={booking.image || "/placeholder.svg"}
													alt={booking.title}
													width={150}
													height={100}
													className="rounded-lg object-cover w-full lg:w-48 h-32"
												/>
												<Badge className={`absolute top-2 left-2 ${getStatusColor(booking.status)} border`}>
													{getStatusIcon(booking.status)}
													<span className="ml-1 capitalize">{booking.status}</span>
												</Badge>
											</div>

											{/* Content */}
											<div className="flex-1">
												<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
													<div>
														<h3 className="text-xl font-bold mb-2">{booking.title}</h3>
														<div className="flex items-center space-x-2 mb-2">
															<Avatar className="w-6 h-6">
																<AvatarImage src={booking.vendorAvatar || "/placeholder.svg"} />
																<AvatarFallback className="text-xs">
																	{booking.vendor
																		.split(" ")
																		.map((n) => n[ 0 ])
																		.join("")}
																</AvatarFallback>
															</Avatar>
															<span className="text-sm text-muted-foreground">by {booking.vendor}</span>
															<div className="flex items-center">
																<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
																<span className="text-xs">{booking.vendorRating}</span>
															</div>
														</div>
													</div>
													<div className="text-right">
														<div className="text-2xl font-bold text-purple-600 mb-1">{booking.amount}</div>
														<div className="text-sm text-muted-foreground">Booking ID: {booking.id}</div>
													</div>
												</div>

												<p className="text-sm text-muted-foreground mb-4">{booking.description}</p>

												{/* Services */}
												<div className="flex flex-wrap gap-2 mb-4">
													{booking.services.map((service, index) => (
														<Badge key={index} variant="secondary" className="text-xs">
															{service}
														</Badge>
													))}
												</div>

												{/* Details Grid */}
												<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
													<div className="flex items-center text-sm">
														<Calendar className="h-4 w-4 mr-2 text-blue-500" />
														<div>
															<div className="font-medium">{booking.date}</div>
															<div className="text-muted-foreground">{booking.time}</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<MapPin className="h-4 w-4 mr-2 text-red-500" />
														<div>
															<div className="font-medium">Location</div>
															<div className="text-muted-foreground">{booking.location}</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<Users className="h-4 w-4 mr-2 text-green-500" />
														<div>
															<div className="font-medium">{booking.guests} Guests</div>
															<div className="text-muted-foreground">Expected</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<Clock className="h-4 w-4 mr-2 text-purple-500" />
														<div>
															<div className="font-medium">Booked on</div>
															<div className="text-muted-foreground">{booking.bookingDate}</div>
														</div>
													</div>
												</div>

												{/* Actions */}
												<div className="flex flex-wrap gap-2">
													<Button
														size="sm"
														className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
													>
														<Eye className="h-3 w-3 mr-1" />
														View Details
													</Button>
													<Button size="sm" variant="outline">
														<Phone className="h-3 w-3 mr-1" />
														Call Vendor
													</Button>
													<Button size="sm" variant="outline">
														<MessageSquare className="h-3 w-3 mr-1" />
														Message
													</Button>
													<Button size="sm" variant="outline">
														<Download className="h-3 w-3 mr-1" />
														Invoice
													</Button>
													{booking.status === "pending" && (
														<Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
															Cancel Booking
														</Button>
													)}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="past">
						<div className="space-y-6">
							{pastBookings.map((booking) => (
								<Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
									<CardContent className="p-6">
										<div className="flex flex-col lg:flex-row gap-6">
											{/* Image */}
											<div className="relative">
												<Image
													src={booking.image || "/placeholder.svg"}
													alt={booking.title}
													width={150}
													height={100}
													className="rounded-lg object-cover w-full lg:w-48 h-32"
												/>
												<Badge className={`absolute top-2 left-2 ${getStatusColor(booking.status)} border`}>
													{getStatusIcon(booking.status)}
													<span className="ml-1 capitalize">{booking.status}</span>
												</Badge>
											</div>

											{/* Content */}
											<div className="flex-1">
												<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
													<div>
														<h3 className="text-xl font-bold mb-2">{booking.title}</h3>
														<div className="flex items-center space-x-2 mb-2">
															<Avatar className="w-6 h-6">
																<AvatarImage src={booking.vendorAvatar || "/placeholder.svg"} />
																<AvatarFallback className="text-xs">
																	{booking.vendor
																		.split(" ")
																		.map((n) => n[ 0 ])
																		.join("")}
																</AvatarFallback>
															</Avatar>
															<span className="text-sm text-muted-foreground">by {booking.vendor}</span>
															<div className="flex items-center">
																<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
																<span className="text-xs">{booking.vendorRating}</span>
															</div>
														</div>
													</div>
													<div className="text-right">
														<div className="text-2xl font-bold text-purple-600 mb-1">{booking.amount}</div>
														<div className="text-sm text-muted-foreground">Booking ID: {booking.id}</div>
													</div>
												</div>

												<p className="text-sm text-muted-foreground mb-4">{booking.description}</p>

												{/* Details Grid */}
												<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
													<div className="flex items-center text-sm">
														<Calendar className="h-4 w-4 mr-2 text-blue-500" />
														<div>
															<div className="font-medium">{booking.date}</div>
															<div className="text-muted-foreground">{booking.time}</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<MapPin className="h-4 w-4 mr-2 text-red-500" />
														<div>
															<div className="font-medium">Location</div>
															<div className="text-muted-foreground">{booking.location}</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<Users className="h-4 w-4 mr-2 text-green-500" />
														<div>
															<div className="font-medium">{booking.guests} Guests</div>
															<div className="text-muted-foreground">Attended</div>
														</div>
													</div>
													<div className="flex items-center text-sm">
														<Clock className="h-4 w-4 mr-2 text-purple-500" />
														<div>
															<div className="font-medium">Event Date</div>
															<div className="text-muted-foreground">{booking.date}</div>
														</div>
													</div>
												</div>

												{/* Actions */}
												<div className="flex flex-wrap gap-2">
													<Button
														size="sm"
														className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
													>
														<Eye className="h-3 w-3 mr-1" />
														View Details
													</Button>
													<Button size="sm" variant="outline">
														<Download className="h-3 w-3 mr-1" />
														Invoice
													</Button>
													{booking.status === "completed" && (
														<>
															<Button
																size="sm"
																variant="outline"
																className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
															>
																<Star className="h-3 w-3 mr-1" />
																Rate & Review
															</Button>
															<Button
																size="sm"
																variant="outline"
																className="text-green-600 border-green-200 hover:bg-green-50"
															>
																Book Again
															</Button>
														</>
													)}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
