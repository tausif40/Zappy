"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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
import BookingSummary from "../BookingSummary"
import { useDispatch, useSelector } from "react-redux"
import { getAddresses, getToCart, order } from "@/store/features/Purchase-slice"

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
		description: "Pay using UPI apps like GPay, PhonePe...",
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
		id: "CASE",
		name: "Offline Payment",
		description: "Pay amount before event organized",
		icon: <Banknote className="h-5 w-5" />,
		popular: false,
	},
]

export default function Payment() {
	const params = useParams()
	const route = useRouter();
	const dispatch = useDispatch();
	const { toast } = useToast()
	const [ selectedAddress, setSelectedAddress ] = useState('')
	const [ addresses, setAddresses ] = useState([])
	const [ paymentMethod, setPaymentMethod ] = useState("")
	const [ agreeToTerms, setAgreeToTerms ] = useState(false)
	const [ processing, setProcessing ] = useState(false)

	const decodedURL = atob(decodeURIComponent(params.ids));
	let [ eventId, bookingId ] = decodedURL.split(":");
	// console.log("Event ID:", eventId);
	// console.log("Booking ID:", bookingId);

	const bookingFlow = useSelector((state) => state.purchaseSlice?.bookingFlow);
	const addressesList = useSelector((state) => state.purchaseSlice?.addresses);
	console.log("bookingFlow on payment-", bookingFlow)
	console.log("addressesList-", addressesList)

	useEffect(() => {
		setSelectedAddress(bookingFlow?.data?.addressId?._id)
	}, [ bookingFlow ])

	useEffect(() => {
		setAddresses(addressesList?.data?.addresses)
	}, [ addressesList ])

	useEffect(() => {
		dispatch(getToCart(bookingId))
		dispatch(getAddresses())
	}, [ dispatch, bookingId ])


	const handlePayment = async () => {
		if (!paymentMethod) {
			toast({
				title: "Select Payment Method",
				description: "Please select a payment method to continue.",
				variant: "destructive",
			})
			return;
		}

		if (!agreeToTerms) {
			toast({
				title: "Terms & Conditions",
				description: "Please accept the terms and conditions to proceed.",
				variant: "destructive",
			})
			return;
		}

		const data = {
			cartId: bookingId,
			paymentMethod: "CASE",
			agreeToTerms: agreeToTerms
		}

		try {
			setProcessing(true)
			const res = await dispatch(order(data)).unwrap();
			console.log(res);
			console.log("id-", res?.data?.id);
			if (res.status === 201) {
				const id = encodeURIComponent(btoa(`${res?.data?.id}`));
				route.push(`/birthday/booking/${id}/success`)
				toast({
					title: "Booking Confirmed",
					description: "Your booking has been confirmed.",
				})
			}
		} catch (error) {
			console.log("Error on schedule:", error);
			toast({ variant: "destructive", title: "Payment failed", description: error?.message || "Your Payment failed!, Please try again" });
		} finally {
			setProcessing(false);
		}
	}

	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: bookingFlow?.data?.event?.title, href: `/birthday/details/${eventId}` },
		{ name: 'Add-Ons', href: `/birthday/booking/${params.ids}/add-ons` },
		{ name: 'Date & Address', href: `/birthday/booking/${params.ids}/schedule` },
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


			<div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20" onClick={() => route.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Date & Time
					</Button>
					<div className="text-sm text-muted-foreground hidden md:block">Step 4 of 4: Payment</div>
				</div>

				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">Payment</h1>
					<p className="text-muted-foreground text-sm">
						Secure & encrypted payment
					</p>
				</div>

				<div className="md:flex gap-8 ">
					{/* Main Content */}
					<div className="space-y-8 w-full">
						{/* Payment Methods */}
						<Card className="border-t shadow">
							<CardContent className="p-4 md:p-8">
								<div className="flex items-center space-x-3 mb-6">
									<CreditCard className="h-6 w-6 text-purple-500" />
									<h2 className="text-lg md:text-2xl font-semibold md:font-bold">Choose Payment Method</h2>
								</div>

								<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
									<div className="grid lg:grid-cols-2 gap-4">
										{paymentOptions.map((option) => (
											<div key={option.id} className="flex items-start md:space-x-3">
												<RadioGroupItem value={option.id} id={option.id} className="sr-only" />
												<Label htmlFor={option.id} className="flex-1 cursor-pointer">
													<Card
														className={`transition-all hover:shadow-md ${paymentMethod === option.id
															? "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10"
															: "hover:bg-muted/30"
															}`}
													>
														<CardContent className="p-4">
															<div className="relative flex items-start justify-between">
																<div className="flex items-start space-x-3">
																	<div className="text-purple-500">{option.icon}</div>
																	<div>
																		<div className="font-medium mb-1">{option.name}</div>
																		<div title={option.description} className="text-xs  text-muted-foreground ">{option.description}</div>
																	</div>
																</div>
																{option.popular && (
																	<Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
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

								{paymentMethod === "CASE" && (
									<div className="mt-6 p-6 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
										<div className="flex items-center space-x-3 mb-3">
											<Banknote className="h-5 w-5 text-orange-600" />
											<h3 className="font-semibold text-orange-800 dark:text-orange-200">Offline Payment</h3>
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
						<Card className="border shadow">
							<CardContent className="p-6">
								<div className="flex items-start md:items-center space-x-2">
									<Checkbox
										id="terms"
										checked={agreeToTerms}
										onCheckedChange={(checked) => setAgreeToTerms(checked)}
										className="mt-1 md:mt-0"
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
					<div className="min-w-72 mt-10 md:mt-0">
						<BookingSummary
							selectedAddOns={bookingFlow?.data?.addOnIds?.map(addon => ({
								_id: addon.id,
								name: addon.name || "Add-on",
								price: addon.price || 0
							})) || []}
							bookingFlow={bookingFlow}
							selectedDate={bookingFlow?.data?.eventDate}
							selectedTime={bookingFlow?.data?.eventTime}
							selectedAddress={selectedAddress}
							addresses={addresses}
							onContinue={handlePayment}
							buttonText={processing ? "Processing..." : paymentMethod === "CASE" ? "Confirm Booking" : `Pay ₹ ${bookingFlow?.data?.itemTotal?.toLocaleString()}`}
							// isLoading={processing || !paymentMethod || !agreeToTerms}
							showSchedule={true}
							showAddress={true}
						/>

						{/* Security Notice */}
						{/* <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
							<Lock className="h-3 w-3" />
							<span>Secure & encrypted</span>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}
