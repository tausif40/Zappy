"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, DollarSign, Package, Users, TrendingUp, Eye, Edit, Trash2, Plus, MoreHorizontal, Star, MapPin, Clock, CheckCircle, AlertCircle, XCircle, Settings, Bell, Download, Filter, Search, BarChart3, CreditCard, Wallet, } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export default function VendorDashboard() {
	const [ searchQuery, setSearchQuery ] = useState("")

	// Mock vendor data
	const vendor = {
		name: "Magic Moments Events",
		email: "contact@magicmoments.com",
		phone: "+91 98765 43210",
		businessType: "Event Planning Company",
		city: "Mumbai",
		memberSince: "January 2022",
		avatar: "/placeholder.svg?height=80&width=80",
		verified: true,
		rating: 4.9,
		totalReviews: 156,
		completedEvents: 450,
		responseTime: "2 hours",
	}

	const stats = [
		{
			title: "Total Earnings",
			value: "₹4,25,600",
			change: "+12% from last month",
			icon: DollarSign,
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			title: "Active Packages",
			value: "8",
			change: "+2 this month",
			icon: Package,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			title: "Total Bookings",
			value: "156",
			change: "+23 this month",
			icon: Calendar,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			title: "Customer Rating",
			value: "4.9",
			change: "Based on 156 reviews",
			icon: Star,
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
	]

	const packages = [
		{
			id: 1,
			title: "Princess Theme Party",
			price: "₹8,999",
			originalPrice: "₹12,999",
			status: "active",
			bookings: 45,
			rating: 4.9,
			reviews: 23,
			image: "/placeholder.svg?height=100&width=150",
			lastBooked: "2 days ago",
			enabled: true,
		},
		{
			id: 2,
			title: "Superhero Adventure",
			price: "₹9,499",
			originalPrice: "₹13,499",
			status: "active",
			bookings: 32,
			rating: 4.8,
			reviews: 18,
			image: "/placeholder.svg?height=100&width=150",
			lastBooked: "1 week ago",
			enabled: true,
		},
		{
			id: 3,
			title: "Jungle Safari Party",
			price: "₹7,999",
			originalPrice: "₹10,999",
			status: "draft",
			bookings: 0,
			rating: 0,
			reviews: 0,
			image: "/placeholder.svg?height=100&width=150",
			lastBooked: "Never",
			enabled: false,
		},
		{
			id: 4,
			title: "Space Explorer Mission",
			price: "₹10,999",
			originalPrice: "₹14,999",
			status: "paused",
			bookings: 12,
			rating: 4.7,
			reviews: 8,
			image: "/placeholder.svg?height=100&width=150",
			lastBooked: "3 weeks ago",
			enabled: false,
		},
	]

	const recentBookings = [
		{
			id: "BK001",
			customerName: "Priya Sharma",
			packageTitle: "Princess Theme Party",
			date: "2024-02-15",
			time: "2:00 PM",
			status: "confirmed",
			amount: "₹8,999",
			guests: 15,
			location: "Bandra, Mumbai",
			customerPhone: "+91 98765 43210",
		},
		{
			id: "BK002",
			customerName: "Rajesh Kumar",
			packageTitle: "Superhero Adventure",
			date: "2024-02-18",
			time: "11:00 AM",
			status: "pending",
			amount: "₹9,499",
			guests: 20,
			location: "Andheri, Mumbai",
			customerPhone: "+91 98765 43211",
		},
		{
			id: "BK003",
			customerName: "Anita Patel",
			packageTitle: "Princess Theme Party",
			date: "2024-02-20",
			time: "3:00 PM",
			status: "completed",
			amount: "₹8,999",
			guests: 12,
			location: "Powai, Mumbai",
			customerPhone: "+91 98765 43212",
		},
	]

	const earnings = {
		thisMonth: "₹45,600",
		lastMonth: "₹38,200",
		pending: "₹12,400",
		available: "₹33,200",
		totalEarned: "₹4,25,600",
	}

	const getStatusColor = (status) => {
		switch (status) {
			case "confirmed":
				return "bg-green-100 text-green-700"
			case "pending":
				return "bg-yellow-100 text-yellow-700"
			case "completed":
				return "bg-blue-100 text-blue-700"
			case "cancelled":
				return "bg-red-100 text-red-700"
			case "active":
				return "bg-green-100 text-green-700"
			case "draft":
				return "bg-gray-100 text-gray-700"
			case "paused":
				return "bg-orange-100 text-orange-700"
			default:
				return "bg-gray-100 text-gray-700"
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

	return (
		<div className="min-h-screen pt-16 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
					<div className="flex items-center space-x-4">
						<Avatar className="w-16 h-16">
							<AvatarImage src={vendor.avatar || "/placeholder.svg"} />
							<AvatarFallback>
								{vendor.name
									.split(" ")
									.map((n) => n[ 0 ])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center space-x-2">
								<h1 className="text-3xl font-bold">{vendor.name}</h1>
								{vendor.verified && (
									<Badge className="bg-green-100 text-green-700 border-0">
										<CheckCircle className="w-3 h-3 mr-1" />
										Verified
									</Badge>
								)}
							</div>
							<div className="flex items-center space-x-4 text-muted-foreground">
								<div className="flex items-center">
									<Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
									{vendor.rating} ({vendor.totalReviews} reviews)
								</div>
								<div className="flex items-center">
									<MapPin className="h-4 w-4 mr-1" />
									{vendor.city}
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center space-x-2 mt-4 md:mt-0">
						<Button variant="outline" size="icon">
							<Bell className="h-4 w-4" />
						</Button>
						<Link href="/vendor/dashboard/profile">
							<Button variant="outline" size="icon">
								<Settings className="h-4 w-4" />
							</Button>
						</Link>
						<Link href="/vendor/dashboard/packages/new">
							<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
								<Plus className="mr-2 h-4 w-4" />
								Add Package
							</Button>
						</Link>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<Card key={index} className="border-0 shadow-lg hover-lift">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
										<p className="text-2xl font-bold">{stat.value}</p>
										<p className="text-xs text-green-600 mt-1">{stat.change}</p>
									</div>
									<div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
										<stat.icon className={`h-6 w-6 ${stat.color}`} />
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Main Content Tabs */}
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-6">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="packages">Packages</TabsTrigger>
						<TabsTrigger value="bookings">Bookings</TabsTrigger>
						<TabsTrigger value="earnings">Earnings</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="profile">Profile</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="space-y-6">
						<div className="grid lg:grid-cols-3 gap-6">
							{/* Recent Bookings */}
							<div className="lg:col-span-2">
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle>Recent Bookings</CardTitle>
											<Link href="/vendor/dashboard/bookings">
												<Button variant="outline" size="sm">
													View All
												</Button>
											</Link>
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{recentBookings.slice(0, 3).map((booking) => (
												<div
													key={booking.id}
													className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
												>
													<div className="flex-1">
														<div className="flex items-center justify-between mb-2">
															<h4 className="font-semibold">{booking.customerName}</h4>
															<Badge className={`${getStatusColor(booking.status)} border-0`}>
																{getStatusIcon(booking.status)}
																<span className="ml-1 capitalize">{booking.status}</span>
															</Badge>
														</div>
														<p className="text-sm text-muted-foreground mb-1">{booking.packageTitle}</p>
														<div className="flex items-center space-x-4 text-xs text-muted-foreground">
															<span>
																{booking.date} at {booking.time}
															</span>
															<span>{booking.guests} guests</span>
															<span>{booking.location}</span>
														</div>
													</div>
													<div className="text-right ml-4">
														<div className="font-semibold">{booking.amount}</div>
														<Button size="sm" variant="outline" className="mt-2">
															<Eye className="h-3 w-3 mr-1" />
															View
														</Button>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Quick Stats */}
							<div className="space-y-6">
								{/* Earnings Summary */}
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-lg">Earnings Summary</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex justify-between">
											<span className="text-sm text-muted-foreground">This Month</span>
											<span className="font-semibold">{earnings.thisMonth}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-muted-foreground">Available</span>
											<span className="font-semibold text-green-600">{earnings.available}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-muted-foreground">Pending</span>
											<span className="font-semibold text-yellow-600">{earnings.pending}</span>
										</div>
										<Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
											<Wallet className="mr-2 h-4 w-4" />
											Transfer Funds
										</Button>
									</CardContent>
								</Card>

								{/* Performance */}
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-lg">Performance</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<div className="flex justify-between text-sm mb-2">
												<span>Response Rate</span>
												<span>95%</span>
											</div>
											<Progress value={95} />
										</div>
										<div>
											<div className="flex justify-between text-sm mb-2">
												<span>Completion Rate</span>
												<span>98%</span>
											</div>
											<Progress value={98} />
										</div>
										<div>
											<div className="flex justify-between text-sm mb-2">
												<span>Customer Satisfaction</span>
												<span>4.9/5</span>
											</div>
											<Progress value={98} />
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* Packages Tab */}
					<TabsContent value="packages" className="space-y-6">
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle>My Packages</CardTitle>
									<div className="flex items-center space-x-2">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
											<Input
												placeholder="Search packages..."
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
												className="pl-10 w-64"
											/>
										</div>
										<Select defaultValue="all">
											<SelectTrigger className="w-32">
												<Filter className="h-4 w-4 mr-2" />
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All</SelectItem>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="draft">Draft</SelectItem>
												<SelectItem value="paused">Paused</SelectItem>
											</SelectContent>
										</Select>
										<Link href="/vendor/dashboard/packages/new">
											<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
												<Plus className="mr-2 h-4 w-4" />
												Add Package
											</Button>
										</Link>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
									{packages.map((pkg) => (
										<Card key={pkg.id} className="border hover:shadow-lg transition-shadow">
											<div className="relative">
												<Image
													src={pkg.image || "/placeholder.svg"}
													alt={pkg.title}
													width={150}
													height={100}
													className="w-full h-32 object-cover rounded-t-lg"
												/>
												<Badge className={`absolute top-2 left-2 ${getStatusColor(pkg.status)} border-0`}>
													{pkg.status}
												</Badge>
												<div className="absolute top-2 right-2">
													<Switch checked={pkg.enabled} />
												</div>
											</div>
											<CardContent className="p-4">
												<h3 className="font-semibold mb-2">{pkg.title}</h3>
												<div className="flex items-center space-x-2 mb-2">
													<span className="text-lg font-bold text-purple-600">{pkg.price}</span>
													<span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
												</div>
												<div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
													<span>{pkg.bookings} bookings</span>
													{pkg.rating > 0 && (
														<div className="flex items-center">
															<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
															{pkg.rating} ({pkg.reviews})
														</div>
													)}
												</div>
												<div className="flex items-center justify-between">
													<span className="text-xs text-muted-foreground">Last booked: {pkg.lastBooked}</span>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost" size="icon">
																<MoreHorizontal className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent>
															<DropdownMenuItem>
																<Eye className="mr-2 h-4 w-4" />
																View
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Edit className="mr-2 h-4 w-4" />
																Edit
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Trash2 className="mr-2 h-4 w-4" />
																Delete
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Bookings Tab */}
					<TabsContent value="bookings" className="space-y-6">
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle>All Bookings</CardTitle>
									<div className="flex items-center space-x-2">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
											<Input placeholder="Search bookings..." className="pl-10 w-64" />
										</div>
										<Select defaultValue="all">
											<SelectTrigger className="w-32">
												<Filter className="h-4 w-4 mr-2" />
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All</SelectItem>
												<SelectItem value="confirmed">Confirmed</SelectItem>
												<SelectItem value="pending">Pending</SelectItem>
												<SelectItem value="completed">Completed</SelectItem>
											</SelectContent>
										</Select>
										<Button variant="outline">
											<Download className="mr-2 h-4 w-4" />
											Export
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentBookings.map((booking) => (
										<div
											key={booking.id}
											className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
										>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-2">
													<h4 className="font-semibold">{booking.customerName}</h4>
													<Badge className={`${getStatusColor(booking.status)} border-0`}>
														{getStatusIcon(booking.status)}
														<span className="ml-1 capitalize">{booking.status}</span>
													</Badge>
												</div>
												<p className="text-sm text-muted-foreground mb-1">{booking.packageTitle}</p>
												<div className="flex items-center space-x-4 text-sm text-muted-foreground">
													<div className="flex items-center">
														<Calendar className="h-3 w-3 mr-1" />
														{booking.date} at {booking.time}
													</div>
													<div className="flex items-center">
														<Users className="h-3 w-3 mr-1" />
														{booking.guests} guests
													</div>
													<div className="flex items-center">
														<MapPin className="h-3 w-3 mr-1" />
														{booking.location}
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="font-semibold text-lg">{booking.amount}</div>
												<div className="flex items-center space-x-1 mt-2">
													<Button size="sm" variant="outline">
														<Eye className="h-3 w-3 mr-1" />
														View
													</Button>
													<Button size="sm" variant="outline">
														Contact
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Earnings Tab */}
					<TabsContent value="earnings" className="space-y-6">
						<div className="grid lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2">
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle>Earnings Overview</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-2 gap-6 mb-6">
											<div className="text-center p-4 bg-green-50 rounded-lg">
												<div className="text-2xl font-bold text-green-600">{earnings.thisMonth}</div>
												<div className="text-sm text-muted-foreground">This Month</div>
											</div>
											<div className="text-center p-4 bg-blue-50 rounded-lg">
												<div className="text-2xl font-bold text-blue-600">{earnings.totalEarned}</div>
												<div className="text-sm text-muted-foreground">Total Earned</div>
											</div>
										</div>
										<div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
											<div className="text-center">
												<BarChart3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
												<p className="text-muted-foreground">Earnings chart would go here</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							<div className="space-y-6">
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-lg">Available Balance</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="text-center">
											<div className="text-3xl font-bold text-green-600">{earnings.available}</div>
											<div className="text-sm text-muted-foreground">Ready to transfer</div>
										</div>
										<Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
											<CreditCard className="mr-2 h-4 w-4" />
											Transfer to Bank
										</Button>
									</CardContent>
								</Card>

								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-lg">Pending Payments</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-center mb-4">
											<div className="text-2xl font-bold text-yellow-600">{earnings.pending}</div>
											<div className="text-sm text-muted-foreground">Processing</div>
										</div>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span>Expected on:</span>
												<span>Feb 28, 2024</span>
											</div>
											<div className="flex justify-between">
												<span>From bookings:</span>
												<span>8 events</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* Analytics Tab */}
					<TabsContent value="analytics" className="space-y-6">
						<div className="grid lg:grid-cols-2 gap-6">
							<Card className="border-0 shadow-lg">
								<CardHeader>
									<CardTitle>Booking Trends</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
										<div className="text-center">
											<TrendingUp className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
											<p className="text-muted-foreground">Booking trends chart</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="border-0 shadow-lg">
								<CardHeader>
									<CardTitle>Popular Packages</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{packages.slice(0, 3).map((pkg, index) => (
											<div key={pkg.id} className="flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
														{index + 1}
													</div>
													<span className="font-medium">{pkg.title}</span>
												</div>
												<span className="text-sm text-muted-foreground">{pkg.bookings} bookings</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Profile Tab */}
					<TabsContent value="profile" className="space-y-6">
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<CardTitle>Vendor Profile</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center space-x-4">
									<Avatar className="w-20 h-20">
										<AvatarImage src={vendor.avatar || "/placeholder.svg"} />
										<AvatarFallback>
											{vendor.name
												.split(" ")
												.map((n) => n[ 0 ])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="text-xl font-semibold">{vendor.name}</h3>
										<p className="text-muted-foreground">{vendor.businessType}</p>
										<div className="flex items-center space-x-4 mt-2">
											<div className="flex items-center">
												<Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
												{vendor.rating} ({vendor.totalReviews} reviews)
											</div>
											<div className="flex items-center">
												<Clock className="h-4 w-4 mr-1" />
												Responds in {vendor.responseTime}
											</div>
										</div>
									</div>
									<Button variant="outline" className="ml-auto">
										<Edit className="mr-2 h-4 w-4" />
										Edit Profile
									</Button>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-semibold mb-3">Contact Information</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Email:</span>
												<span>{vendor.email}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Phone:</span>
												<span>{vendor.phone}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">City:</span>
												<span>{vendor.city}</span>
											</div>
										</div>
									</div>

									<div>
										<h4 className="font-semibold mb-3">Business Stats</h4>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Member Since:</span>
												<span>{vendor.memberSince}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Completed Events:</span>
												<span>{vendor.completedEvents}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Response Time:</span>
												<span>{vendor.responseTime}</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
