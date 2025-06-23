"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
	ArrowLeft,
	CreditCard,
	Smartphone,
	Wallet,
	Shield,
	Calendar,
	Clock,
	MapPin,
	Lock,
	Banknote,
	ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function Payment() {
	const params = useParams()
	const searchParams = useSearchParams()
	const route = useRouter();
	const eventId = params.id
	const { toast } = useToast()

	const [ paymentMethod, setPaymentMethod ] = useState("")
	const [ agreeToTerms, setAgreeToTerms ] = useState(false)
	const [ processing, setProcessing ] = useState(false)

	// Get booking details from URL params
	const selectedTheme = searchParams.get("theme")
	const selectedDate = searchParams.get("date")
	const selectedTime = searchParams.get("time")
	const selectedAddress = searchParams.get("address")

	const basePrice = 8999
	const themePrice =
		selectedTheme === "frozen-princess"
			? 500
			: selectedTheme === "unicorn-princess"
				? 750
				: selectedTheme === "fairy-princess"
					? 600
					: selectedTheme === "royal-princess"
						? 800
						: selectedTheme === "mermaid-princess"
							? 700
							: 0

	const subtotal = basePrice + themePrice
	const tax = Math.round(subtotal * 0.18) // 18% GST
	const totalPrice = subtotal + tax

	const paymentOptions = [
		{
			id: "card",
			name: "Credit/Debit Card",
			description: "Pay securely with your card",
			icon: <CreditCard className="h-5 w-5" />,
			popular: true,
		},
		{
			id: "upi",
			name: "UPI Payment",
			description: "Pay using UPI apps like GPay, PhonePe, Paytm",
			icon: <Smartphone className="h-5 w-5" />,
			popular: true,
		},
		{
			id: "netbanking",
			name: "Net Banking",
			description: "Pay directly from your bank account",
			icon: <Wallet className="h-5 w-5" />,
			popular: false,
		},
		{
			id: "wallet",
			name: "Digital Wallet",
			description: "Paytm, PhonePe, Amazon Pay",
			icon: <Wallet className="h-5 w-5" />,
			popular: false,
		},
		{
			id: "cod",
			name: "Cash on Delivery",
			description: "Pay cash when the service is delivered",
			icon: <Banknote className="h-5 w-5" />,
			popular: false,
		},
	]

	const formatDate = (dateString) => {
		if (!dateString) return "Not selected"
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	const handlePayment = async () => {
		if (!paymentMethod) {
			toast({
				title: "Payment Method Required",
				description: "Please select a payment method to continue.",
				variant: "destructive",
			})
			return
		}

		if (!agreeToTerms) {
			toast({
				title: "Terms & Conditions",
				description: "Please accept the terms and conditions to proceed.",
				variant: "destructive",
			})
			return
		}

		setProcessing(true)

		// Simulate payment processing
		if (paymentMethod === "cod") {
			toast({
				title: "Booking Confirmed",
				description: "Your booking has been confirmed. You can pay cash on delivery.",
			})
		} else {
			toast({
				title: "Processing Payment",
				description: "Please wait while we process your payment...",
			})
		}

		setTimeout(
			() => {
				// Navigate to success page
				// window.location.href = `/booking/${eventId}/success?${searchParams.toString()}&payment=${paymentMethod}`
				route.push(`/birthday/booking/${eventId}/success`)
			},
			paymentMethod === "cod" ? 1000 : 2000,
		)
	}

	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: 'Princess Theme Birthday Party', href: '/' },
		{ name: 'Choose Theme', href: '/birthday/booking/1/themes' },
		{ name: 'Date & Address', href: '/' },
		{ name: 'Payment', href: '' },
	];

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
						Back to Date & Time
					</Button>
					<div className="text-sm text-muted-foreground">Step 3 of 3: Payment</div>
				</div>

				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">Payment</h1>
					<p className="text-muted-foreground text-sm">
						Secure & encrypted payment
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-8">
						{/* Payment Methods */}
						<Card className="border-0 shadow">
							<CardContent className="p-8">
								<div className="flex items-center space-x-3 mb-6">
									<CreditCard className="h-6 w-6 text-purple-500" />
									<h2 className="text-2xl font-bold">Choose Payment Method</h2>
								</div>

								<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
									<div className="grid md:grid-cols-2 gap-4">
										{paymentOptions.map((option) => (
											<div key={option.id} className="flex items-center space-x-3">
												<RadioGroupItem value={option.id} id={option.id} className="sr-only" />
												<Label htmlFor={option.id} className="flex-1 cursor-pointer">
													<Card
														className={`transition-all hover:shadow-md ${paymentMethod === option.id
															? "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10"
															: "hover:bg-muted/30"
															}`}
													>
														<CardContent className="p-4">
															<div className="flex items-center justify-between">
																<div className="flex items-center space-x-3">
																	<div className="text-purple-500">{option.icon}</div>
																	<div>
																		<div className="font-medium">{option.name}</div>
																		<div className="text-sm text-muted-foreground">{option.description}</div>
																	</div>
																</div>
																{option.popular && (
																	<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
																		Popular
																	</Badge>
																)}
															</div>
														</CardContent>
													</Card>
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>

								{paymentMethod === "card" && (
									<div className="mt-6 p-6 border rounded-lg bg-muted/30">
										<h3 className="font-semibold mb-4">Card Details</h3>
										<div className="space-y-4">
											<div>
												<label className="text-sm font-medium">Card Number</label>
												<Input placeholder="1234 5678 9012 3456" />
											</div>
											<div className="grid grid-cols-2 gap-4">
												<div>
													<label className="text-sm font-medium">Expiry Date</label>
													<Input placeholder="MM/YY" />
												</div>
												<div>
													<label className="text-sm font-medium">CVV</label>
													<Input placeholder="123" />
												</div>
											</div>
											<div>
												<label className="text-sm font-medium">Cardholder Name</label>
												<Input placeholder="John Doe" />
											</div>
										</div>
									</div>
								)}

								{paymentMethod === "cod" && (
									<div className="mt-6 p-6 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
										<div className="flex items-center space-x-3 mb-3">
											<Banknote className="h-5 w-5 text-orange-600" />
											<h3 className="font-semibold text-orange-800 dark:text-orange-200">Cash on Delivery</h3>
										</div>
										<ul className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
											<li>• Pay cash when our team arrives for setup</li>
											<li>• Please keep exact amount ready</li>
											<li>• Payment receipt will be provided on-site</li>
											<li>• 50% advance can be paid online to confirm booking</li>
										</ul>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Terms & Conditions */}
						<Card className="border-0 shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="terms"
										checked={agreeToTerms}
										onCheckedChange={(checked) => setAgreeToTerms(checked)}
									/>
									<Label htmlFor="terms" className="text-sm">
										I agree to the{" "}
										<Link href="/terms" className="text-purple-600 hover:underline">
											Terms of Service
										</Link>
										,{" "}
										<Link href="/privacy" className="text-purple-600 hover:underline">
											Privacy Policy
										</Link>
										, and{" "}
										<Link href="/cancellation" className="text-purple-600 hover:underline">
											Cancellation Policy
										</Link>
									</Label>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Compact Sidebar */}
					<div className="lg:col-span-1">
						<Card className="border-0 shadow-lg sticky top-24">
							<CardContent className="p-4">
								<h3 className="font-semibold mb-3">Final Summary</h3>

								{/* Event Details */}
								<div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
									<h4 className="font-medium text-sm">Event Details</h4>
									<div className="space-y-1 text-xs">
										<div className="flex items-center space-x-1">
											<Calendar className="h-3 w-3" />
											{/* <span>{formatDate(selectedDate)}</span> */}
											<span>Tuesday, August 5, 2025</span>
										</div>
										<div className="flex items-center space-x-1">
											<Clock className="h-3 w-3" />
											{/* <span>{selectedTime}</span> */}
											<span>11:00 AM</span>
										</div>
										<div className="flex items-center space-x-1">
											<MapPin className="h-3 w-3" />
											<span>Address selected</span>
										</div>
									</div>
								</div>

								{/* Price Breakdown */}
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

									<div className="flex justify-between">
										<span>GST (18%)</span>
										<span>₹{tax.toLocaleString()}</span>
									</div>

									<div className="border-t pt-2">
										<div className="flex justify-between font-semibold">
											<span>Total</span>
											<span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
										</div>
									</div>
								</div>

								<Button
									onClick={handlePayment}
									disabled={!paymentMethod || !agreeToTerms || processing}
									className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
								>
									{processing ? (
										"Processing..."
									) : paymentMethod === "cod" ? (
										<>
											<Banknote className="mr-2 h-5 w-5" />
											Confirm Booking
										</>
									) : (
										<>
											<Shield className="mr-2 h-5 w-5" />
											Pay ₹{totalPrice.toLocaleString()}
										</>
									)}
								</Button>

								<div className="mt-3 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
									<Lock className="h-3 w-3" />
									<span>Secure & encrypted</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
