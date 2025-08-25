"use client"
import Image from "next/image"
import { useState } from "react"
import {
	ShoppingCart,
	Plus,
	Minus,
	Trash2,
	Heart,
	Star,
	Calendar,
	Users,
	MapPin,
	Clock,
	CreditCard,
	Tag,
	Gift,
	ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch } from "react-redux"

// const [ cartItems, setCartItems ] = useState([
// 	{
// 		id: 1,
// 		title: "Princess Theme Party",
// 		vendor: "Magic Moments Events",
// 		price: 8999,
// 		originalPrice: 12999,
// 		quantity: 1,
// 		image: "/placeholder.svg?height=120&width=180",
// 		rating: 4.9,
// 		reviews: 156,
// 		duration: "4 hours",
// 		ageGroup: "3-8 years",
// 		services: [ "Decorations", "Entertainment", "Photography", "Catering" ],
// 		selectedDate: "2024-02-15",
// 		selectedTime: "2:00 PM",
// 		guests: 15,
// 		location: "Home Service",
// 		addedDate: "2024-01-20",
// 		discount: 31,
// 	},
// 	{
// 		id: 2,
// 		title: "Science Explorer Workshop",
// 		vendor: "Curious Minds",
// 		price: 7499,
// 		originalPrice: 9999,
// 		quantity: 1,
// 		image: "/placeholder.svg?height=120&width=180",
// 		rating: 4.7,
// 		reviews: 89,
// 		duration: "3 hours",
// 		ageGroup: "6-12 years",
// 		services: [ "Experiments", "Materials", "Instructor", "Certificate" ],
// 		selectedDate: "2024-02-20",
// 		selectedTime: "10:00 AM",
// 		guests: 12,
// 		location: "Home Service",
// 		addedDate: "2024-01-18",
// 		discount: 25,
// 	},
// 	{
// 		id: 3,
// 		title: "Sports Adventure Camp",
// 		vendor: "Active Kids",
// 		price: 8499,
// 		originalPrice: 10999,
// 		quantity: 1,
// 		image: "/placeholder.svg?height=120&width=180",
// 		rating: 4.8,
// 		reviews: 67,
// 		duration: "5 hours",
// 		ageGroup: "5-14 years",
// 		services: [ "Sports Equipment", "Coaching", "Snacks", "Medals" ],
// 		selectedDate: "2024-02-25",
// 		selectedTime: "9:00 AM",
// 		guests: 20,
// 		location: "Outdoor Venue",
// 		addedDate: "2024-01-15",
// 		discount: 23,
// 	},
// ])

export default function UserCart() {
	const dispatch = useDispatch();

	const [ promoCode, setPromoCode ] = useState("");
	const [ appliedPromo, setAppliedPromo ] = useState(null)

	const [ cartItems, setCartItems ] = useState([
	{
		id: 1,
		title: "Princess Theme Party",
		vendor: "Magic Moments Events",
		price: 8999,
		originalPrice: 12999,
		quantity: 1,
		image: "/placeholder.svg?height=120&width=180",
		rating: 4.9,
		reviews: 156,
		duration: "4 hours",
		ageGroup: "3-8 years",
		services: [ "Decorations", "Entertainment", "Photography", "Catering" ],
		selectedDate: "2024-02-15",
		selectedTime: "2:00 PM",
		guests: 15,
		location: "Home Service",
		addedDate: "2024-01-20",
		discount: 31,
	},
	{
		id: 2,
		title: "Science Explorer Workshop",
		vendor: "Curious Minds",
		price: 7499,
		originalPrice: 9999,
		quantity: 1,
		image: "/placeholder.svg?height=120&width=180",
		rating: 4.7,
		reviews: 89,
		duration: "3 hours",
		ageGroup: "6-12 years",
		services: [ "Experiments", "Materials", "Instructor", "Certificate" ],
		selectedDate: "2024-02-20",
		selectedTime: "10:00 AM",
		guests: 12,
		location: "Home Service",
		addedDate: "2024-01-18",
		discount: 25,
	},
	{
		id: 3,
		title: "Sports Adventure Camp",
		vendor: "Active Kids",
		price: 8499,
		originalPrice: 10999,
		quantity: 1,
		image: "/placeholder.svg?height=120&width=180",
		rating: 4.8,
		reviews: 67,
		duration: "5 hours",
		ageGroup: "5-14 years",
		services: [ "Sports Equipment", "Coaching", "Snacks", "Medals" ],
		selectedDate: "2024-02-25",
		selectedTime: "9:00 AM",
		guests: 20,
		location: "Outdoor Venue",
		addedDate: "2024-01-15",
		discount: 23,
	},
])

	// const bookingData = useSelector((state) => state.bookingSlice.bookingHistory)
	// console.log(bookingData?.data?.results);

	// useEffect(() => {
	// 	setBookings(bookingData?.data?.results || [])
	// }, [ bookingData ])

	// useEffect(() => {
	// 	dispatch(getBookingHistory())
	// }, [ dispatch ])


	const updateQuantity = (id, newQuantity) => {
		if (newQuantity < 1) return
		setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
	}

	const removeItem = (id) => {
		setCartItems((items) => items.filter((item) => item.id !== id))
	}

	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
	const totalDiscount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
	const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0
	const taxes = Math.floor(subtotal * 0.18)
	const total = subtotal - promoDiscount + taxes

	const applyPromoCode = () => {
		if (promoCode.toLowerCase() === "save10") {
			setAppliedPromo({ code: "SAVE10", discount: 10, amount: promoDiscount })
		}
	}

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
						Shopping Cart 🛒
					</h1>
					<p className="text-muted-foreground">
						{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-6">
						{cartItems.map((item) => (
							<Card key={item.id} className="border dark:border-0 shadow hover:shadow-md transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex flex-col md:flex-row gap-6">
										{/* Image */}
										<div className="relative">
											<Image
												src={item.image || "/placeholder.svg"}
												alt={item.title}
												width={180}
												height={120}
												className="rounded-lg object-cover w-full md:w-48 h-32"
											/>
											<Badge className="absolute top-2 left-2 bg-red-500 text-white border-0">
												{item.discount}% OFF
											</Badge>
										</div>

										{/* Content */}
										<div className="flex-1">
											<div className="flex justify-between items-start mb-3">
												<div>
													<h3 className="text-xl font-bold mb-1">{item.title}</h3>
													<p className="text-sm text-muted-foreground mb-2">by {item.vendor}</p>
													<div className="flex items-center space-x-4 text-sm">
														<div className="flex items-center">
															<Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
															<span>{item.rating}</span>
															<span className="text-muted-foreground ml-1">({item.reviews})</span>
														</div>
														<div className="flex items-center text-muted-foreground">
															<Clock className="h-3 w-3 mr-1" />
															{item.duration}
														</div>
														<div className="flex items-center text-muted-foreground">
															<Users className="h-3 w-3 mr-1" />
															{item.ageGroup}
														</div>
													</div>
												</div>
												<div className="flex space-x-2">
													<Button size="icon" variant="ghost" className="text-pink-500">
														<Heart className="h-4 w-4" />
													</Button>
													<Button
														size="icon"
														variant="ghost"
														className="text-red-500"
														onClick={() => removeItem(item.id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>

											{/* Services */}
											<div className="flex flex-wrap gap-2 mb-4">
												{item.services.map((service, index) => (
													<Badge key={index} variant="secondary" className="text-xs">
														{service}
													</Badge>
												))}
											</div>

											{/* Event Details */}
											<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
												<div className="flex items-center">
													<Calendar className="h-4 w-4 mr-2 text-blue-500" />
													<div>
														<div className="font-medium">{item.selectedDate}</div>
														<div className="text-muted-foreground">{item.selectedTime}</div>
													</div>
												</div>
												<div className="flex items-center">
													<Users className="h-4 w-4 mr-2 text-green-500" />
													<div>
														<div className="font-medium">{item.guests} Guests</div>
														<div className="text-muted-foreground">Expected</div>
													</div>
												</div>
												<div className="flex items-center">
													<MapPin className="h-4 w-4 mr-2 text-red-500" />
													<div>
														<div className="font-medium">{item.location}</div>
														<div className="text-muted-foreground">Location</div>
													</div>
												</div>
												<div className="flex items-center">
													<Tag className="h-4 w-4 mr-2 text-purple-500" />
													<div>
														<div className="font-medium">Added</div>
														<div className="text-muted-foreground">{item.addedDate}</div>
													</div>
												</div>
											</div>

											{/* Price and Quantity */}
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4">
													<div className="flex items-center space-x-2">
														<span className="text-sm text-muted-foreground">Qty:</span>
														<div className="flex items-center border rounded-lg">
															<Button
																size="icon"
																variant="ghost"
																className="h-8 w-8"
																onClick={() => updateQuantity(item.id, item.quantity - 1)}
															>
																<Minus className="h-3 w-3" />
															</Button>
															<span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
															<Button
																size="icon"
																variant="ghost"
																className="h-8 w-8"
																onClick={() => updateQuantity(item.id, item.quantity + 1)}
															>
																<Plus className="h-3 w-3" />
															</Button>
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="flex gap-4 items-center">
														<div className="text-sm font-medium text-muted-foreground line-through">
															₹{(item.originalPrice * item.quantity).toLocaleString()}
														</div>
														<div className="text-2xl font-bold text-green-600">
															₹{(item.price * item.quantity).toLocaleString()}
														</div>
													</div>
													<div className="text-xs text-green-600 font-medium">
														You save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}

						{/* Continue Shopping */}
						{/* <Card className="border dark:border-0 shadow-md">
							<CardContent className="p-6 text-center">
								<ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
								<h3 className="text-lg font-semibold mb-2">Want to add more events?</h3>
								<p className="text-muted-foreground mb-4">Discover more amazing events and experiences for your kids</p>
								<Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
									Continue Shopping
								</Button>
							</CardContent>
						</Card> */}
					</div>

					{/* Order Summary */}
					<div className="space-y-6">
						{/* Promo Code */}
						<Card className="border dark:border-0 shadow-md">
							<CardHeader>
								<CardTitle className="text-lg flex items-center">
									<Gift className="h-5 w-5 mr-2 text-purple-600" />
									Promo Code
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex space-x-2">
										<Input
											placeholder="Enter promo code"
											value={promoCode}
											onChange={(e) => setPromoCode(e.target.value)}
										/>
										<Button
											variant='highlight'
											onClick={applyPromoCode}
											className="text-white"
										>
											Apply
										</Button>
									</div>
									{appliedPromo && (
										<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
											<div className="flex items-center">
												<Gift className="h-4 w-4 text-green-600 mr-2" />
												<span className="text-sm font-medium text-green-700">{appliedPromo.code} Applied</span>
											</div>
											<span className="text-sm font-bold text-green-700">-₹{appliedPromo.amount.toLocaleString()}</span>
										</div>
									)}
									<div className="text-xs text-muted-foreground">💡 Try "SAVE10" for 10% off</div>
								</div>
							</CardContent>
						</Card>

						{/* Order Summary */}
						<Card className="border dark:border-0 shadow-md">
							<CardHeader>
								<CardTitle className="text-lg flex items-center">
									<CreditCard className="h-5 w-5 mr-2 text-green-600" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
										<span className="font-medium">₹{subtotal.toLocaleString()}</span>
									</div>
									<div className="flex justify-between text-green-600">
										<span>Package Discounts</span>
										<span>-₹{totalDiscount.toLocaleString()}</span>
									</div>
									{appliedPromo && (
										<div className="flex justify-between text-green-600">
											<span>Promo Discount ({appliedPromo.discount}%)</span>
											<span>-₹{promoDiscount.toLocaleString()}</span>
										</div>
									)}
									{/* <div className="flex justify-between">
										<span className="text-muted-foreground">Taxes & Fees (18%)</span>
										<span className="font-medium">₹{taxes.toLocaleString()}</span>
									</div> */}
									<Separator />
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<span className="text-green-600">₹{total.toLocaleString()}</span>
									</div>
									<div className="text-xs text-muted-foreground">
										You're saving ₹{(totalDiscount + promoDiscount).toLocaleString()} on this order!
									</div>
								</div>

								<Separator className="my-4" />

								{/* Payment Options */}
								<div className="space-y-3">
									<div className="flex items-center space-x-2">
										<Checkbox id="terms" />
										<label htmlFor="terms" className="text-sm text-muted-foreground">
											I agree to the terms and conditions
										</label>
									</div>
									<Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 text-lg">
										Proceed to Checkout
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
									<div className="text-center">
										<div className="text-xs text-muted-foreground mb-2">Secure payment powered by</div>
										<div className="flex justify-center space-x-4 text-xs text-muted-foreground">
											<span>💳 Cards</span>
											<span>📱 UPI</span>
											<span>🏦 Net Banking</span>
											<span>💰 Wallets</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Trust Indicators */}
						<Card className="border dark:border-0 shadow-md">
							<CardContent className="p-4">
								<div className="space-y-3 text-sm">
									<div className="flex items-center">
										<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
										<span>100% Secure Payment</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
										<span>Free Cancellation up to 24hrs</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
										<span>24/7 Customer Support</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Empty Cart State */}
				{cartItems.length === 0 && (
					<Card className="border dark:border-0 shadow-md">
						<CardContent className="p-12 text-center">
							<ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
							<p className="text-muted-foreground mb-6">Add some amazing events to get started!</p>
							<Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
								Browse Events
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
