"use client"
import Image from "next/image"
import Link from "next/link"
import {
	Calendar,
	MapPin,
	Star,
	Users,
	CheckCircle,
	Heart,
	CreditCard,
	Award,
	ShoppingCart,
	Plus,
	Eye,
	ArrowUpRight,
	TrendingUp,
	Gift,
	Target,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function UserOverview() {
	const user = {
		name: "Priya Sharma",
		email: "priya.sharma@email.com",
		phone: "+91 98765 43210",
		location: "Mumbai, Maharashtra",
		memberSince: "January 2023",
		avatar: "/placeholder.svg?height=80&width=80",
		totalBookings: 12,
		totalSpent: "₹1,24,500",
		favoriteVendors: 8,
		loyaltyPoints: 2450,
		nextReward: 3000,
		tier: "Gold Member",
	}

	const stats = [
		{
			title: "Total Bookings",
			value: "12",
			change: "+3 this month",
			icon: Calendar,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
			trend: "+25%",
		},
		{
			title: "Total Spent",
			value: "₹1,24,500",
			change: "+₹15,000 this month",
			icon: CreditCard,
			color: "text-green-600",
			bgColor: "bg-green-50",
			trend: "+12%",
		},
		{
			title: "Loyalty Points",
			value: "2,450",
			change: "+250 this month",
			icon: Award,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
			trend: "+11%",
		},
		{
			title: "Favorite Vendors",
			value: "8",
			change: "+2 this month",
			icon: Heart,
			color: "text-pink-600",
			bgColor: "bg-pink-50",
			trend: "+33%",
		},
	]

	const upcomingEvents = [
		{
			id: 1,
			title: "Princess Theme Party",
			vendor: "Magic Moments Events",
			date: "2024-02-15",
			time: "2:00 PM",
			daysLeft: 5,
			status: "confirmed",
			image: "/placeholder.svg?height=80&width=80",
			location: "Home",
			guests: 15,
			amount: "₹8,999",
		},
		{
			id: 2,
			title: "Space Explorer Mission",
			vendor: "Cosmic Kids",
			date: "2024-03-05",
			time: "10:00 AM",
			daysLeft: 23,
			status: "pending",
			image: "/placeholder.svg?height=80&width=80",
			location: "Community Hall",
			guests: 20,
			amount: "₹12,499",
		},
	]

	const recentActivities = [
		{
			type: "booking",
			title: "New Booking Confirmed",
			message: "Princess Theme Party booking confirmed for Feb 15",
			time: "2 hours ago",
			icon: Calendar,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			type: "points",
			title: "Points Earned",
			message: "You earned 250 loyalty points from your recent booking",
			time: "1 day ago",
			icon: Award,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			type: "review",
			title: "Review Submitted",
			message: "You left a 5-star review for Hero Events Co.",
			time: "3 days ago",
			icon: Star,
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			type: "favorite",
			title: "Vendor Added",
			message: "Wild Celebrations added to your favorites",
			time: "1 week ago",
			icon: Heart,
			color: "text-pink-600",
			bgColor: "bg-pink-50",
		},
	]

	const recommendations = [
		{
			id: 1,
			title: "Fairy Tale Magic",
			vendor: "Enchanted Events",
			price: "₹9,999",
			originalPrice: "₹12,999",
			image: "/placeholder.svg?height=120&width=120",
			rating: 4.9,
			reviews: 45,
			discount: "23% OFF",
			badge: "Popular",
		},
		{
			id: 2,
			title: "Science Explorer Day",
			vendor: "Curious Minds",
			price: "₹7,499",
			originalPrice: "₹9,999",
			image: "/placeholder.svg?height=120&width=120",
			rating: 4.7,
			reviews: 32,
			discount: "25% OFF",
			badge: "New",
		},
		{
			id: 3,
			title: "Sports Adventure Camp",
			vendor: "Active Kids",
			price: "₹8,499",
			originalPrice: "₹10,999",
			image: "/placeholder.svg?height=120&width=120",
			rating: 4.8,
			reviews: 28,
			discount: "23% OFF",
			badge: "Trending",
		},
	]

	const quickActions = [
		{
			title: "Book New Event",
			description: "Discover amazing events",
			icon: Plus,
			color: "bg-gradient-to-r from-purple-500 to-pink-500",
			href: "/kids-events",
		},
		{
			title: "Find Vendors",
			description: "Browse top vendors",
			icon: Users,
			color: "bg-gradient-to-r from-blue-500 to-cyan-500",
			href: "/vendors",
		},
		{
			title: "View Cart",
			description: "3 items waiting",
			icon: ShoppingCart,
			color: "bg-gradient-to-r from-green-500 to-emerald-500",
			href: "/dashboard/cart",
		},
		{
			title: "Redeem Points",
			description: "2,450 points available",
			icon: Gift,
			color: "bg-gradient-to-r from-orange-500 to-red-500",
			href: "/dashboard/loyalty",
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
			default:
				return "bg-gray-100 text-gray-700 border-gray-200"
		}
	}

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center space-x-4 mb-4">
						<Avatar className="w-16 h-16 border-4 border-white shadow-lg">
							<AvatarImage src={user.avatar || "/placeholder.svg"} />
							<AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
								{user.name
									.split(" ")
									.map((n) => n[ 0 ])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Welcome back, {user.name.split(" ")[ 0 ]}! 👋
							</h1>
							<p className="text-muted-foreground">
								{user.tier} • {user.location} • Member since {user.memberSince}
							</p>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
						>
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-4">
									<div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
										<stat.icon className={`h-6 w-6 ${stat.color}`} />
									</div>
									<Badge variant="secondary" className="text-xs font-medium">
										{stat.trend}
									</Badge>
								</div>
								<div>
									<p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
									<p className="text-2xl font-bold mb-1">{stat.value}</p>
									<p className="text-xs text-green-600 font-medium">{stat.change}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{quickActions.map((action, index) => (
						<Link key={index} href={action.href}>
							<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
								<CardContent className="p-0">
									<div className={`${action.color} p-6 text-white`}>
										<div className="flex items-center justify-between mb-3">
											<action.icon className="h-8 w-8" />
											<ArrowUpRight className="h-5 w-5 opacity-70" />
										</div>
										<h3 className="font-semibold text-lg mb-1">{action.title}</h3>
										<p className="text-sm opacity-90">{action.description}</p>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Main Content Grid */}
				<div className="grid lg:grid-cols-3 gap-8 mb-8">
					{/* Upcoming Events */}
					<div className="lg:col-span-2">
						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-xl flex items-center">
										<Calendar className="h-5 w-5 mr-2 text-purple-600" />
										Upcoming Events
									</CardTitle>
									<Link href="/dashboard/bookings">
										<Button variant="outline" size="sm" className="hover:bg-purple-50">
											View All
											<ArrowUpRight className="ml-1 h-3 w-3" />
										</Button>
									</Link>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{upcomingEvents.map((event) => (
										<div
											key={event.id}
											className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300"
										>
											<div className="relative">
												<Image
													src={event.image || "/placeholder.svg"}
													alt={event.title}
													width={80}
													height={80}
													className="rounded-lg object-cover"
												/>
												<div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
													{event.daysLeft}
												</div>
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-2">
													<h3 className="font-semibold text-lg">{event.title}</h3>
													<Badge className={`${getStatusColor(event.status)} border`}>
														<CheckCircle className="h-3 w-3 mr-1" />
														{event.status}
													</Badge>
												</div>
												<p className="text-sm text-muted-foreground mb-2">by {event.vendor}</p>
												<div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
													<div className="flex items-center">
														<Calendar className="h-3 w-3 mr-1" />
														{event.date} at {event.time}
													</div>
													<div className="flex items-center">
														<MapPin className="h-3 w-3 mr-1" />
														{event.location}
													</div>
													<div className="flex items-center">
														<Users className="h-3 w-3 mr-1" />
														{event.guests} guests
													</div>
													<div className="flex items-center font-semibold text-purple-600">
														<CreditCard className="h-3 w-3 mr-1" />
														{event.amount}
													</div>
												</div>
											</div>
											<div className="flex flex-col space-y-2">
												<Button
													variant='highlight'
													size="sm"
													className="text-white"
												>
													<Eye className="h-3 w-3 mr-1" />
													View Details
												</Button>
												<Button size="sm" variant="outline">
													Contact Vendor
												</Button>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Loyalty Progress */}
					<div>
						<Card className="border-0 shadow-lg mb-6 overflow-hidden">
							<div className="bg-gradient-to-r from-pink-600 to-red-600 p-6 text-white">
								<div className="flex items-center justify-between mb-4">
									<div>
										<h3 className="font-semibold text-lg">Loyalty Program</h3>
										<p className="text-sm opacity-90">{user.tier}</p>
									</div>
									<Award className="h-8 w-8 opacity-80" />
								</div>
								<div className="space-y-3">
									<div className="flex justify-between text-sm">
										<span>Current Points</span>
										<span className="font-bold">{user.loyaltyPoints}</span>
									</div>
									<Progress value={(user.loyaltyPoints / user.nextReward) * 100} className="h-2 bg-white/20" />
									<div className="flex justify-between text-xs opacity-90">
										<span>{user.loyaltyPoints} points</span>
										<span>{user.nextReward} points (Next Reward)</span>
									</div>
								</div>
							</div>
							<CardContent className="p-4">
								<div className="text-center">
									<p className="text-sm text-muted-foreground mb-3">
										{user.nextReward - user.loyaltyPoints} points to next reward
									</p>
									<Link href="/dashboard/loyalty">
										<Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
											<Gift className="mr-2 h-4 w-4" />
											View Rewards
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>

						{/* Recent Activity */}
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<CardTitle className="text-lg flex items-center">
									<TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
									Recent Activity
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentActivities.map((activity, index) => (
										<div key={index} className="flex items-start space-x-3">
											<div
												className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}
											>
												<activity.icon className={`w-4 h-4 ${activity.color}`} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-foreground">{activity.title}</p>
												<p className="text-xs text-muted-foreground">{activity.message}</p>
												<p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Recommendations */}
				<Card className="border-0 shadow-lg">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl flex items-center">
								<Target className="h-5 w-5 mr-2 text-purple-600" />
								Recommended for You
							</CardTitle>
							<Link href="/kids-events">
								<Button variant="outline" size="sm" className="hover:bg-purple-50">
									Browse All
									<ArrowUpRight className="ml-1 h-3 w-3" />
								</Button>
							</Link>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							{recommendations.map((event) => (
								<Card
									key={event.id}
									className="border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
								>
									<div className="relative">
										<Image
											src={event.image || "/placeholder.svg"}
											alt={event.title}
											width={120}
											height={120}
											className="w-full h-40 object-cover"
										/>
										<Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">{event.discount}</Badge>
										<Badge className="absolute top-3 right-3 bg-purple-500 text-white border-0">{event.badge}</Badge>
										<Button
											size="icon"
											variant="ghost"
											className="absolute bottom-3 right-3 bg-white/80 hover:bg-white shadow-lg"
										>
											<Heart className="h-4 w-4" />
										</Button>
									</div>
									<CardContent className="p-4">
										<h3 className="font-semibold mb-1">{event.title}</h3>
										<p className="text-sm text-muted-foreground mb-3">{event.vendor}</p>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center space-x-2">
												<span className="text-lg font-bold text-purple-600">{event.price}</span>
												<span className="text-sm text-muted-foreground line-through">{event.originalPrice}</span>
											</div>
											<div className="flex items-center">
												<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
												<span className="text-sm font-medium">{event.rating}</span>
												<span className="text-xs text-muted-foreground ml-1">({event.reviews})</span>
											</div>
										</div>
										<Button className="w-full text-white bg-primary">
											<Plus className="mr-2 h-4 w-4" />
											Book Now
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
