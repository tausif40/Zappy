"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Plus, Edit, ChevronRight, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import DateTimeSelect from "./DateTimeSelect"
import { useDispatch, useSelector } from "react-redux"
import { deleteAddresses, getAddresses, getToCart, updateToCart } from "@/store/features/Purchase-slice"
import BookingSummary from "../BookingSummary"
import Address from "./Address"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Schedule() {
	const route = useRouter();
	const params = useParams()
	const dispatch = useDispatch();
	const { toast } = useToast()

	const [ dateTime, setDateTime ] = useState()
	const [ selectedAddress, setSelectedAddress ] = useState("")
	const [ showAddAddress, setShowAddAddress ] = useState(false)
	const [ addresses, setAddresses ] = useState([])
	const [ isAddingToCart, setIsAddingToCart ] = useState(false)

	const decodedURL = atob(decodeURIComponent(params.ids));
	let [ eventId, bookingId ] = decodedURL.split(":");
	// console.log("Event ID:", eventId);
	// console.log("Booking ID:", bookingId);

	const bookingFlow = useSelector((state) => state.purchaseSlice?.bookingFlow);
	const addressesList = useSelector((state) => state.purchaseSlice?.addresses);
	console.log("bookingFlow on schedule-", bookingFlow)
	// console.log("addressesList-", addressesList)

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


	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: bookingFlow?.data?.event?.title, href: `/birthday/details/${eventId}` },
		{ name: 'Add-Ons', href: `/birthday/booking/${params.ids}/add-ons` },
		{ name: 'Date & Address', href: '' },
	];

	const handleContinue = async () => {
		if (!dateTime) {
			toast({
				title: "Missing Date or Time",
				description: "Please select a date and time",
				variant: "destructive",
			});
			return;
		}
		if (!selectedAddress) {
			toast({
				title: "Missing Address",
				description: "Please select an address to continue.",
				variant: "destructive",
			});
			return;
		}

		const data = {
			addOnIds: { eventTime: dateTime.eventTime, eventDate: dateTime.eventDate, addressId: selectedAddress },
			bookingId: bookingId
		}
		try {
			setIsAddingToCart(true)
			const res = await dispatch(updateToCart(data)).unwrap();
			console.log(res);
			if (res.status === 200) {
				route.push(`/birthday/booking/${params.ids}/payment`)
			}
		} catch (error) {
			console.log("Error on schedule:", error);
			toast({ variant: "destructive", title: "Error to continue", description: error?.message || "Something went wrong, Please try again" });
		} finally {
			setIsAddingToCart(false);
		}
	}

	const handelDeleteAddress = async (id) => {
		try {
			const res = await dispatch(deleteAddresses(id)).unwrap();
			if (res.status) {
				toast({
					title: "Deleted",
					description: "Address deleted successfully",
					variant: "success",
				});
			}
			console.log(res);
		} catch (error) {
			console.log(error);
		}
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
						Back to Add-ons
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
						<DateTimeSelect dateTime={setDateTime} />

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
										<DialogContent className="">
											<p className="text-2xl font-bold text-muted-foreground">Add Address</p>
											<ScrollArea className="h-[80vh]">
												<Address popup={setShowAddAddress} />
											</ScrollArea>
										</DialogContent>
									</Dialog>
								</div>

								<RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
									<div className="space-y-4">
										{addresses?.map((address) => (
											<div key={address?._id} className="flex items-start space-x-3">
												<RadioGroupItem
													value={address?._id}
													id={address?._id}
													className="mt-4"
												/>
												<Label htmlFor={address?._id} className="flex-1 cursor-pointer">
													<Card
														className={`transition-all ${selectedAddress === address?._id
															? "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10"
															: "hover:bg-muted/30"
															}`}
													>
														<CardContent className="p-4">
															{/* Header: type + default + edit */}
															<div className="flex items-center justify-between mb-2">
																<div className="flex items-center space-x-2 capitalize">
																	<Badge variant="secondary">{address?.addressType}</Badge>
																	{address?.isDefault && (
																		<Badge className="bg-green-100 text-green-700 border-0">Default</Badge>
																	)}
																</div>
																<Button variant="ghost" size="sm" onClick={() => handelDeleteAddress(address?._id)}>
																	<Trash className="h-3 w-3 text-red-500" />
																</Button>
															</div>

															{/* Main details */}
															<div className="space-y-1 text-sm text-muted-foreground">
																<div className="text-base text-foreground">
																	{address?.name}
																	{address?.mobile && <span>&nbsp;-&nbsp;{address?.mobile}</span>}
																</div>
																<div>{address?.address},&nbsp;
																	{address?.landMark && <span>{address?.landMark}</span>}
																	{address?.city},&nbsp;
																	{address?.state} -
																	{address?.pincode}
																</div>{address?.street && <div>Street: {address?.street}</div>}

																<div className="flex">
																	{address?.companyName && <div>Company Name: {address?.companyName}</div>}
																	{address?.gstin && <div>&nbsp;| GSTIN: {address?.gstin}</div>}
																</div>
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

						{/* <Address /> */}
					</div>

					<BookingSummary
						selectedAddOns={bookingFlow?.data?.addOnIds?.map(addon => ({
							_id: addon.id,
							name: addon.name || "Add-on",
							price: addon.price || 0
						})) || []}
						bookingFlow={bookingFlow}
						selectedDate={dateTime?.eventDate || bookingFlow?.data?.eventDate}
						selectedTime={dateTime?.eventTime || bookingFlow?.data?.eventTime}
						selectedAddress={selectedAddress}
						addresses={addresses}
						onContinue={handleContinue}
						buttonText="Continue to Payment"
						showSchedule={true}
						showAddress={true}
					/>

				</div>
			</div>
		</div>
	)
}

