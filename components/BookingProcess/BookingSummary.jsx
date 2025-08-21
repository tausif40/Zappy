import React from 'react'
import { ArrowRight, Calendar, Clock, MapPin, Package, Plus, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function BookingSummary({
	// selectedAddOns = [],
	bookingFlow = {},
	selectedDate = null,
	selectedTime = null,
	selectedAddress = null,
	addresses = [],
	onContinue,
	isLoading = false,
	buttonText = "Continue",
	showSchedule = true,
	showAddress = true,
}) {


	const selectedAddOns = bookingFlow?.data?.addOnIds?.map(addon => ({
		_id: addon.id,
		name: addon.name || "Add-on",
		price: addon.price || 0
	})) || []

	// Calculate total price
	const basePrice = bookingFlow?.data?.discountedPrice || 0
	const addOnsTotal = selectedAddOns?.reduce((sum, addOn) => sum + (addOn?.price || 0), 0) || 0

	const totalPrice = basePrice + addOnsTotal

	// Get selected address details
	const selectedAddressDetails = addresses?.find(addr => addr._id === selectedAddress)

	// Format date
	console.log("selectedDate:", selectedDate);
	const formatDate = (dateString) => {
		if (!dateString) return null
		const date = new Date(dateString)
		return date.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		})
	}

	return (
		<>
			<Card className="shadow-md h-full">
				<CardContent className="p-4 space-y-4">
					{/* Header */}
					<div className="text-center pb-2">
						<h4 className="font-semibold text-lg">Booking Summary</h4>
						<p className="text-sm text-muted-foreground">Review your selections</p>
					</div>

					{/* Event Details */}
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<Package className="h-4 w-4 text-purple-500" />
							{/* <h5 className="font-semibold text-sm" title={bookingFlow?.data?.event?.title}>{bookingFlow?.data?.event?.title?.substring(0, 30)}</h5> */}
							<h5 className="font-semibold text-sm truncate" title={bookingFlow?.data?.event?.title}>
								{bookingFlow?.data?.event?.title}
							</h5>

						</div>
						<div className="pl-6 space-y-2">
							<div className="flex justify-between text-sm">
								<span className="capitalize">{bookingFlow?.data?.eventTitle || "Event Package"}</span>
								<span className="font-medium">₹{bookingFlow?.data?.discountedPrice?.toLocaleString()}</span>
							</div>
						</div>
					</div>

					{/* Add-ons Section */}
					{selectedAddOns && selectedAddOns.length > 0 && (
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<Plus className="h-4 w-4 text-emerald-500" />
								<h5 className="font-medium text-sm">Add-ons</h5>
							</div>
							<div className="pl-6 space-y-2">
								{selectedAddOns.map((addon) => (
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

					{/* Schedule Section */}
					{showSchedule && (selectedDate || selectedTime) && (
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<Calendar className="h-4 w-4 text-blue-500" />
								<h5 className="font-medium text-sm">Schedule</h5>
							</div>
							<div className="pl-6 space-y-2">
								{selectedDate && (
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Date</span>
										<span>{formatDate(selectedDate)}</span>
									</div>
								)}
								{selectedTime && (
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Time</span>
										<span>{selectedTime}</span>
									</div>
								)}
							</div>
						</div>
					)}


					{showAddress && selectedAddressDetails && (
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<MapPin className="h-4 w-4 text-red-500" />
								<h5 className="font-medium text-sm">Event Location</h5>
							</div>
							<div className="pl-6 space-y-2">
								<div className="text-sm">
									<div className="flex items-center space-x-2 mb-1">
										<Badge variant="secondary" className="text-xs">{selectedAddressDetails.addressType}</Badge>
										{selectedAddressDetails.isDefault && (
											<Badge className="bg-green-100 text-green-700 border-0 text-xs">Default</Badge>
										)}
									</div>
									<div className="text-muted-foreground text-xs leading-relaxed">
										{selectedAddressDetails.name}<br />
										{selectedAddressDetails.address}<br />
										{selectedAddressDetails.city}, {selectedAddressDetails.state} - {selectedAddressDetails.pincode}<br />
										{selectedAddressDetails.phone}
									</div>
								</div>
							</div>
						</div>
					)}


					<Separator />

					{/* Pricing Summary */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>Package price</span>
							<span>₹{bookingFlow?.data?.discountedPrice?.toLocaleString()}</span>
							{/* <span>₹{basePrice.toLocaleString()}</span> */}
						</div>

						{selectedAddOns && selectedAddOns.length > 0 && (
							<div className="flex justify-between text-sm">
								<span>Add-ons ({selectedAddOns.length})</span>
								<span>+ ₹{addOnsTotal.toLocaleString()}</span>
							</div>
						)}

						<Separator />

						<div className="flex justify-between font-bold text-base">
							<span>Total</span>
							<span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
						</div>
					</div>

					{/* Continue Button */}
					{/* bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 */}
					{onContinue && (
						<Button
							onClick={onContinue}
							variant='highlight'
							className="w-full"
							disabled={isLoading}
						>
							{buttonText}&nbsp;
							{isLoading ? (
								<LoaderCircle className="animate-spin h-4 w-4 ml-2" />
							) : (
								<ArrowRight className="ml-2 h-4 w-4" />
							)}
						</Button>
					)}
				</CardContent>
			</Card>

			{/* Address Section */}
			{/* <Card className="shadow-md h-full z-50">
				
			</Card> */}
		</>
	)
}

export default BookingSummary