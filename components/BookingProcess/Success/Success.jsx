"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, Calendar, Clock, MapPin, Download, Share2, MessageCircle, Phone, Mail, Home, Star, Copy, Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { getOrderDetails } from "@/store/features/Purchase-slice"
import { useCurrentUrl } from "@/lib/useCurrentUrl"
import ShareDrawer from "@/components/ShereOption/ShareDrawer"


export default function Success() {
	const params = useParams()
	const route = useRouter();
	const dispatch = useDispatch();
	const { toast } = useToast()
	const currentUrl = useCurrentUrl();
	const shareRef = useRef(null);
	const [ isVendor, setIsVendor ] = useState(false)
	const [ orderDetails, setOrderDetails ] = useState([])

	const bookingId = atob(decodeURIComponent(params.ids));

	const orderedData = useSelector((state) => state.purchaseSlice?.orderDetails);
	console.log("orderedData- ", orderedData);

	useEffect(() => {
		setOrderDetails(orderedData?.data)
	}, [ orderedData ]);

	useEffect(() => {
		dispatch(getOrderDetails(bookingId))
	}, [ dispatch, bookingId ]);

	// useEffect(() => {
	// 	const handlePopState = () => {
	// 		route.replace("/birthday")
	// 	}

	// 	window.addEventListener("popstate", handlePopState)
	// 	return () => {
	// 		window.removeEventListener("popstate", handlePopState)
	// 	}
	// }, [ route ])

	// const basePrice = bookingFlow?.data?.discountedPrice || 0
	// const addOnsTotal = selectedAddOns?.reduce((sum, addOn) => sum + (addOn?.price || 0), 0) || 0

	// const totalPrice = basePrice + addOnsTotal

	// const paymentMethodNames = {
	// 	card: "Credit/Debit Card",
	// 	upi: "UPI Payment",
	// 	netbanking: "Net Banking",
	// 	wallet: "Digital Wallet",
	// 	cod: "Cash on Delivery",
	// }

	const handleCopyBookingId = () => {
		navigator.clipboard.writeText(bookingId)
		toast({
			title: "Copied!",
			description: "Booking ID copied to clipboard.",
		})
	}

	const handleShare = () => {
		const shareText = `🎉 My princess party is booked with Zappy! 
			Booking ID: ${bookingId}
			Date: ${moment(selectedDate).format("dddd, D MMMM YYYY")} at ${selectedTime}
			
			Book your events at Zappy.com`

		if (navigator.share) {
			navigator.share({
				title: "My Zappy Booking",
				text: shareText,
			})
		} else {
			navigator.clipboard.writeText(shareText)
			toast({
				title: "Shared!",
				description: "Booking details copied to clipboard.",
			})
		}
	}

	const handleDownloadReceipt = () => {
		toast({
			title: "Download Started",
			description: "Your booking receipt is being downloaded.",
		})
	}

	return (
		<div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
			<div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
				{/* Success Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
						<CheckCircle className="h-10 w-10 text-green-600" />
					</div>
					<h1 className="text-3xl font-bold text-green-800 mb-2">Booking Confirmed! 🎉</h1>
					<p className="text-muted-foreground">
						Your event has been successfully booked. Get ready for a magical celebration!
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Booking Details */}
						<Card className="border-0 shadow">
							<CardContent className="p-6 md:p-8">
								<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
									<h2 className="text-xl md:text-2xl font-bold">Booking Details</h2>
									<div className="flex items-center space-x-2">
										<Badge className="bg-green-100 text-green-700 border-0">Confirmed</Badge>
										<Button variant="ghost" size="sm" onClick={handleCopyBookingId}>
											<Copy className="h-4 w-4 mr-1" />
											{orderDetails?.orderNumber?.split("-").pop()}
										</Button>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<div>
											<h3 className="font-semibold text-purple-600 mb-2">Event Information</h3>
											<div className="space-y-2">
												<div className="flex items-center space-x-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">
														{/* {formatDate(orderDetails?.eventBookingDate)} */}
														{moment(orderDetails?.eventBookingDate).format("dddd, D MMMM YYYY")}
													</span>
												</div>
												<div className="flex items-center space-x-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">
														{moment(orderDetails?.eventBookingDate).format("hh:mm A")}
													</span>
												</div>
												<div className="flex items-start space-x-2">
													<MapPin className="min-h-4 min-w-4 text-muted-foreground" />
													{orderDetails?.eventAddress && <span className="text-sm">{`
													${orderDetails?.eventAddress?.companyName},
													${orderDetails?.eventAddress?.address},
													 ${orderDetails?.eventAddress?.city},
													  ${orderDetails?.eventAddress?.state} 
														(${orderDetails?.eventAddress?.pincode}), 
														${orderDetails?.eventAddress?.landMark}
													`}</span>}
												</div>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<div>
											<h3 className="font-semibold text-purple-600 mb-2">Payment Details</h3>

											<div className="space-y-2 mb-2">
												<div className="flex items-center space-x-2">
													<Package className="h-4 w-4 text-purple-500" />
													{/* <h5 className="font-semibold text-sm" title={bookingFlow?.data?.event?.title}>{bookingFlow?.data?.event?.title?.substring(0, 30)}</h5> */}
													<h5 className="font-semibold text-sm truncate" title={orderDetails?.event?.title}>
														{orderDetails?.event?.title}
													</h5>
												</div>
												<div className="pl-6 space-y-2">
													<div className="flex justify-between text-sm">
														<span className="capitalize">{orderDetails?.selectedTier?.name || "Package"}</span>
														<span className="font-medium">₹{orderDetails?.discountedPrice?.toLocaleString()}</span>
													</div>
												</div>
											</div>

											{orderDetails?.addOns?.length > 0 && (
												<div className="space-y-2">
													<div className="flex items-center space-x-2">
														<Plus className="h-4 w-4 text-emerald-500" />
														<h5 className="font-medium text-sm">Add-ons</h5>
													</div>
													<div className="pl-6 space-y-2">
														{orderDetails?.addOns?.map((addon) => (
															<div key={addon?._id} className="flex justify-between items-center gap-2 text-sm">
																<span title={addon?.name} className="truncate text-muted-foreground">
																	{addon?.name}
																</span>
																<span className="text-emerald-600 min-w-max">+ ₹{(addon?.price || 0).toLocaleString()}</span>
															</div>
														))}
													</div>
												</div>
											)}

											<div className="mt-2">
												<Separator />
												<div className="flex justify-between font-semibold mt-2">
													<span>Total Paid</span>
													<span className="text-green-600">₹{orderDetails?.itemTotal?.toLocaleString()}</span>
												</div>
											</div>
										</div>

										<div>
											<h3 className="font-semibold text-purple-600 mb-2">Payment Method</h3>
											<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
												<div className="font-medium">
													{/* {paymentMethodNames[ paymentMethod ] || paymentMethod} */}
													Cash on Delivery
												</div>
												{/* {paymentMethod === "cod" && (
												)} */}
												<div className="text-sm text-muted-foreground">Pay cash on delivery</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Next Steps */}
						<Card className="border-0 shadow">
							<CardContent className="p-6 md:p-8">
								<h2 className="text-xl md:text-2xl font-bold mb-6">What Happens Next?</h2>
								<div className="space-y-4">
									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
											<span className="text-sm font-semibold text-purple-600">1</span>
										</div>
										<div>
											<h3 className="font-semibold">Confirmation Call</h3>
											<p className="text-sm text-muted-foreground">
												Our team will call you within 2 hours to confirm all details and discuss any special
												requirements.
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
											<span className="text-sm font-semibold text-purple-600">2</span>
										</div>
										<div>
											<h3 className="font-semibold">Pre-Event Planning</h3>
											<p className="text-sm text-muted-foreground">
												24 hours before the event, we'll share the complete setup timeline and coordinator contact
												details.
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
											<span className="text-sm font-semibold text-purple-600">3</span>
										</div>
										<div>
											<h3 className="font-semibold">Event Day</h3>
											<p className="text-sm text-muted-foreground">
												Our team will arrive 2 hours before the event time for complete setup and decoration.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1 space-y-6">
						{/* Quick Actions */}
						<Card className="border-0 shadow">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Quick Actions</h3>
								<div className="space-y-3">
									<Button onClick={handleDownloadReceipt} variant="outline" className="w-full justify-start">
										<Download className="mr-2 h-4 w-4" />
										Download Receipt
									</Button>
									<Button onClick={() => shareRef.current?.openDrawer()} variant="outline" className="w-full justify-start">
										<Share2 className="mr-2 h-4 w-4" />
										Share Booking
									</Button>
									{/* <Button variant="outline" className="w-full justify-start">
										<MessageCircle className="mr-2 h-4 w-4" />
										Chat with Vendor
									</Button> */}
								</div>
							</CardContent>
						</Card>

						<ShareDrawer
							ref={shareRef}
							url={currentUrl}
							text={`🎉 My ${orderDetails?.event?.title} is booked with Zappy! \n Check booking details`}
						/>

						{/* Vendor Contact */}
						{isVendor && <Card className="border-0 shadow">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Vendor Contact</h3>
								<div className="space-y-3">
									<div className="text-center">
										<h4 className="font-medium">Magic Moments Events</h4>
										<div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
											<Star className="h-3 w-3 text-yellow-400 fill-current" />
											<span>4.9 (156 reviews)</span>
										</div>
									</div>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<Phone className="mr-2 h-4 w-4" />
											+91 98765 43210
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Mail className="mr-2 h-4 w-4" />
											Contact Vendor
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>}

						{/* Support */}
						<Card className="border-0 shadow">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-2">Need Help?</h3>
								<div className="space-y-3">
									<p className="text-sm text-muted-foreground">
										Our customer support team is here to help you with any questions or concerns.
									</p>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<Phone className="mr-2 h-4 w-4" />
											Call Support
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<MessageCircle className="mr-2 h-4 w-4" />
											Live Chat
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>


					</div>
				</div>
				{/* Navigation */}
				{/* <Card className="border-0 shadow mt-8">
					<CardContent className="p-6">
						<div className="flex gap-6">
							<Link href="/dashboard/bookings">
								<Button variant='highlight' className="w-full text-white">
									<Home className="mr-2 h-4 w-4" />
									Go to Dashboard
								</Button>
							</Link>
							<Link href="/">
								<Button variant="outline" className="w-full">
									Browse More Events
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card> */}
				<div className="flex gap-6 mt-12 justify-center">
					<Link href="/">
						<Button variant='highlight' className="w-full text-white">
							<Home className="mr-2 h-4 w-4" />
							Go to Dashboard
						</Button>
					</Link>
					<Link href="/">
						<Button variant="outline" className="w-full">
							Browse More Events
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
