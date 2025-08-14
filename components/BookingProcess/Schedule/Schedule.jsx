"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Plus, Edit, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import DateTimeSelect from "./DateTimeSelect"

export default function Schedule() {
	const searchParams = useSearchParams()
	const route = useRouter();
	const params = useParams()
	const eventId = params.id
	const selectedTheme = searchParams.get("theme")
	const { toast } = useToast()
	const eventTitle = localStorage.getItem("eventTitle");

	const [ selectedDate, setSelectedDate ] = useState("")
	const [ selectedTime, setSelectedTime ] = useState("")
	const [ selectedAddress, setSelectedAddress ] = useState("")
	const [ showAddAddress, setShowAddAddress ] = useState(false)
	const [ currentMonth, setCurrentMonth ] = useState(new Date())


	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: eventTitle, href: `/birthday/details/${eventId}` },
		{ name: 'Add-Ons', href: '/birthday/booking/1/add-ons' },
		{ name: 'Date & Address', href: '' },
	];

	const [ addresses ] = useState([
		{
			id: 1,
			type: "Home",
			name: "John Doe",
			address: "123 Main Street, Apartment 4B",
			city: "Mumbai",
			state: "Maharashtra",
			pincode: "400001",
			phone: "+91 98765 43210",
			isDefault: true,
		},
		{
			id: 2,
			type: "Office",
			name: "John Doe",
			address: "456 Business Park, Floor 5",
			city: "Mumbai",
			state: "Maharashtra",
			pincode: "400002",
			phone: "+91 98765 43210",
			isDefault: false,
		},
	])

	const [ newAddress, setNewAddress ] = useState({
		type: "Home",
		name: "",
		address: "",
		city: "",
		state: "",
		pincode: "",
		phone: "",
	})

	const basePrice = 8999
	const themePrice = selectedTheme === "frozen-princess" ? 500 : selectedTheme === "unicorn-princess" ? 750 : selectedTheme === "fairy-princess" ? 600 : selectedTheme === "royal-princess" ? 800 : selectedTheme === "mermaid-princess" ? 700 : 0

	const totalPrice = basePrice + themePrice

	const handleContinue = () => {
		// if (!selectedDate || !selectedTime || !selectedAddress) {
		// 	toast({
		// 		title: "Missing Information",
		// 		description: "Please select date, time, and address to continue.",
		// 		variant: "destructive",
		// 	})
		// 	return
		// }

		// Navigate to payment page
		// const params = new URLSearchParams({
		// 	theme: selectedTheme || "",
		// 	date: selectedDate,
		// 	time: selectedTime,
		// 	address: selectedAddress,
		// })

		// window.location.href = `/booking/${eventId}/payment?${params.toString()}`
		route.push(`/birthday/booking/${eventId}/payment`)
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	return (
		<div className="min-h-screen pt-16 bg-background">
			<div className="bg-muted/30 py-4">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex items-center text-sm text-muted-foreground space-x-1">
						{breadcrumb.map((item, index) => (
							<div key={index} className="flex items-center">
								{index !== 0 && <ChevronRight className="w-4 h-4 mx-1" />}
								{item.href ? (
									<Link href={item.href}>
										<span className="hover:text-primary">{item.name}</span>
									</Link>
								) : (
									<span className="font-medium text-foreground">{item.name}</span>
								)}
							</div>
						))}
					</nav>
				</div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20" onClick={() => route.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Themes
					</Button>
					<div className="text-sm text-muted-foreground">Step 3 of : Schedule & Address</div>
				</div>


				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">Select Date & Address</h1>
					<p className="text-muted-foreground text-sm">
						Select the perfect date for your event.
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-8">
						{/* Date & Time Selection */}
						<DateTimeSelect />

						{/* Address Selection */}
						<Card className="border-0 shadow">
							<CardContent className="p-8">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center space-x-3">
										<MapPin className="h-6 w-6 text-purple-500" />
										<h2 className="text-2xl font-bold">Event Address</h2>
									</div>
									<Dialog open={showAddAddress} onOpenChange={setShowAddAddress}>
										<DialogTrigger asChild>
											<Button variant="outline">
												<Plus className="mr-2 h-4 w-4" />
												Add New Address
											</Button>
										</DialogTrigger>
										<DialogContent className="max-w-md">
											<DialogHeader>
												<DialogTitle>Add New Address</DialogTitle>
											</DialogHeader>
											<div className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="text-sm font-medium">Address Type</label>
														<Select
															value={newAddress.type}
															onValueChange={(value) => setNewAddress({ ...newAddress, type: value })}
														>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="Home">Home</SelectItem>
																<SelectItem value="Office">Office</SelectItem>
																<SelectItem value="Other">Other</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div>
														<label className="text-sm font-medium">Full Name</label>
														<Input
															value={newAddress.name}
															onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
															placeholder="John Doe"
														/>
													</div>
												</div>
												<div>
													<label className="text-sm font-medium">Address</label>
													<Textarea
														value={newAddress.address}
														onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
														placeholder="Street address, apartment, suite, etc."
													/>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="text-sm font-medium">City</label>
														<Input
															value={newAddress.city}
															onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
															placeholder="Mumbai"
														/>
													</div>
													<div>
														<label className="text-sm font-medium">State</label>
														<Input
															value={newAddress.state}
															onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
															placeholder="Maharashtra"
														/>
													</div>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="text-sm font-medium">Pincode</label>
														<Input
															value={newAddress.pincode}
															onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
															placeholder="400001"
														/>
													</div>
													<div>
														<label className="text-sm font-medium">Phone</label>
														<Input
															value={newAddress.phone}
															onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
															placeholder="+91 98765 43210"
														/>
													</div>
												</div>
												<div className="flex space-x-2">
													<Button onClick={() => setShowAddAddress(false)} variant="outline" className="flex-1">
														Cancel
													</Button>
													<Button
														variant='highlight'
														onClick={() => {
															setShowAddAddress(false)
															toast({ title: "Address Added", description: "New address has been saved." })
														}}
														className="flex-1 text-white"
													>
														Save Address
													</Button>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								</div>

								<RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
									<div className="space-y-4">
										{addresses.map((address) => (
											<div key={address.id} className="flex items-start space-x-3">
												<RadioGroupItem value={address.id.toString()} id={address.id.toString()} className="mt-4" />
												<Label htmlFor={address.id.toString()} className="flex-1 cursor-pointer">
													<Card
														className={`transition-all ${selectedAddress === address.id.toString()
															? "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10"
															: "hover:bg-muted/30"
															}`}
													>
														<CardContent className="p-4">
															<div className="flex items-center justify-between mb-2">
																<div className="flex items-center space-x-2">
																	<Badge variant="secondary">{address.type}</Badge>
																	{address.isDefault && (
																		<Badge className="bg-green-100 text-green-700 border-0">Default</Badge>
																	)}
																</div>
																<Button variant="ghost" size="sm">
																	<Edit className="h-3 w-3" />
																</Button>
															</div>
															<div className="space-y-1">
																<div className="font-medium">{address.name}</div>
																<div className="text-sm text-muted-foreground">{address.address}</div>
																<div className="text-sm text-muted-foreground">
																	{address.city}, {address.state} - {address.pincode}
																</div>
																<div className="text-sm text-muted-foreground">{address.phone}</div>
															</div>
														</CardContent>
													</Card>
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</CardContent>
						</Card>
					</div>

					{/* Compact Sidebar */}
					<div className="lg:col-span-1">
						<Card className="border shadow-lg sticky top-24">
							<CardContent className="p-4">
								<h3 className="font-semibold mb-3">Summary</h3>

								<div className="space-y-2 mb-4 text-sm">
									<div className="flex justify-between">
										<span>Base Package</span>
										<span>₹{basePrice.toLocaleString()}</span>
									</div>

									{themePrice > 0 && (
										<div className="flex justify-between">
											<span>Theme Upgrade</span>
											<span>+₹{themePrice.toLocaleString()}</span>
										</div>
									)}

									<div className="border-t pt-2">
										<div className="flex justify-between font-semibold">
											<span>Total</span>
											<span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
										</div>
									</div>
								</div>

								{selectedDate && selectedTime && (
									<div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1 text-sm">Event Schedule:</h4>
										<div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
											<div className="flex items-center space-x-1">
												<Calendar className="h-3 w-3" />
												<span>{formatDate(selectedDate)}</span>
											</div>
											<div className="flex items-center space-x-1">
												<Clock className="h-3 w-3" />
												<span>{selectedTime}</span>
											</div>
										</div>
									</div>
								)}

								{selectedAddress && (
									<div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
										<h4 className="font-medium text-green-800 dark:text-green-200 mb-1 text-sm">Event Address:</h4>
										<div className="text-xs text-green-700 dark:text-green-300">
											{addresses.find((a) => a.id.toString() === selectedAddress)?.address}
										</div>
									</div>
								)}

								<Button
									onClick={handleContinue}
									// disabled={!selectedDate || !selectedTime || !selectedAddress}
									className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
								>
									Continue to Payment
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

