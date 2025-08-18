"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLast, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { getAddons, getCategory } from "@/store/features/addOns-slice"
import { getToCart } from "@/store/features/Purchase-slice"

export default function AddOns() {
	const params = useParams()
	const route = useRouter()
	const dispatch = useDispatch();
	const { toast } = useToast()
	const [ selectedAddOnIds, setSelectedAddOnIds ] = useState([])
	const [ selectedCategory, setSelectedCategory ] = useState(null)
	const [ isDetailsOpen, setIsDetailsOpen ] = useState(false)
	const [ selectedAddonDetails, setSelectedAddonDetails ] = useState(null)

	const decodedURL = atob(decodeURIComponent(params.ids));
	let [ eventId, bookingId ] = decodedURL.split(":");

	console.log("Event ID:", eventId);
	console.log("Booking ID:", bookingId);

	// const basePrice = 8999

	useEffect(() => {
		dispatch(getCategory())
		dispatch(getAddons())
		dispatch(getToCart(bookingId))
	}, [ dispatch, bookingId ])

	const category = useSelector((state) => state.addOnsSlice?.category);
	const addonsList = useSelector((state) => state.addOnsSlice?.addons);
	const bookingFlow = useSelector((state) => state.purchaseSlice?.bookingFlow);

	// Add loading states and safety checks
	const isLoading = !category?.data || !addonsList?.data?.results;
	const hasError = category?.error || addonsList?.error;

	console.log("bookingFlow-", bookingFlow)
	// console.log("addonsList-", addonsList?.data?.results)	

	const handleAddOnToggle = (id) => {
		setSelectedAddOnIds((prev) =>
			prev.includes(id) ? prev.filter((addOnId) => addOnId !== id) : [ ...prev, id ]
		)
	}

	const handleCategorySelect = (categoryId) => {
		setSelectedCategory(categoryId)
	}

	const handleMoreDetails = (addon) => {
		setSelectedAddonDetails(addon)
		setIsDetailsOpen(true)
	}

	const filteredAddons = selectedCategory
		? (addonsList?.data?.results && Array.isArray(addonsList.data.results)
			? addonsList.data.results.filter(addon => addon?.category === selectedCategory) : []) || []
		: (addonsList?.data?.results && Array.isArray(addonsList.data.results) ? addonsList.data.results : []) || []

	// Get all selected add-ons regardless of current category filter
	const selectedAddOns = (addonsList?.data?.results && Array.isArray(addonsList.data.results)
		? addonsList.data.results.filter((addOn) => selectedAddOnIds?.includes(addOn?._id))
		: []) || []
	const totalPrice = bookingFlow?.data?.itemTotal + selectedAddOns?.reduce((sum, addOn) => sum + (addOn?.price || 0), 0)

	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: bookingFlow?.data?.event?.title, href: `/birthday/details/${eventId}` },
		{ name: 'Add-Ons', href: '' },
	];

	const handleContinue = async () => {
		try {
			const res = await dispatch(addToCart(cartData)).unwrap();
			console.log(res);
			if (res.status === 201) {
				const ids = encodeURIComponent(btoa(`${eventId}:${res?.data?.id}`));
				route.push(`/birthday/booking/${ids}/schedule`)
			}
		} catch (error) {
			console.log("Error adding to cart:", error);
			if (error?.status === 401) {
				toast({ variant: "destructive", title: "Please Login", description: "If you are already account, Signup" });
			}
		} finally {
			setIsAddingToCart(false);
		}

	}

	return (
		<div className="min-h-screen bg-background pt-16">

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
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" onClick={() => route.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Plan
					</Button>
					<span className="text-sm text-muted-foreground">Step 2 of 4: Chose Add-Ons</span>
				</div>

				<div className="grid lg:grid-cols-4 mb-8 gap-8">
					<div className="lg:col-span-3 flex justify-between items-end">
						<div className="">
							<h1 className="text-2xl font-bold mb-2">Add-ons</h1>
							<p className="text-muted-foreground text-sm">
								Choose Add-Ons for Your Event
							</p>
						</div>
						<Button variant='link' className="flex rounded-full px-6 !py-1 text-md text-muted-foreground"
							onClick={() => route.push(`/birthday/booking/${eventId}/schedule`)}>
							<p>Skip </p><span><ChevronLast /></span>
						</Button>
					</div>
				</div>

				<div className="grid lg:grid-cols-4 gap-8 ">
					<div className="lg:col-span-3 grid md:grid-cols-4 gap-6 p-4 bg-highlights rounded-lg">
						<div className="col-span-1">
							<h2 className="text-xl font-semibold pb-2">Category</h2>
							<ScrollArea className="border py-2 pl-2 pr-3 rounded h-[80vh] min-w-xl">
								{/* Loading State */}
								{isLoading && (
									<div className="text-center py-4 text-muted-foreground">
										<p>Loading categories...</p>
									</div>
								)}

								{/* Error State */}
								{hasError && (
									<div className="text-center py-4 text-red-500">
										<p>Error loading data. Please refresh.</p>
									</div>
								)}

								{/* All Categories Option */}
								{!isLoading && !hasError && (
									<p
										className={`border p-2 rounded-md bg-background mb-2 cursor-pointer transition-colors ${!selectedCategory ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-50'
											}`}
										onClick={() => handleCategorySelect(null)}
									>
										📋 All Categories
									</p>
								)}

								{/* Category List */}
								{!isLoading && !hasError && category?.data && Array.isArray(category.data) && category.data.map((cat) => (
									<p
										key={cat?.id || cat?._id || Math.random()}
										className={`border p-2 rounded-md bg-background mb-2 cursor-pointer transition-colors ${selectedCategory === cat?.name ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-50'
											}`}
										onClick={() => handleCategorySelect(cat?.name)}
									>
										{cat?.name || 'Unnamed Category'}
									</p>
								))}
							</ScrollArea>
						</div>
						<div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !items-start gap-4 pt-8">
							{/* Loading State */}
							{isLoading && (
								<div className="col-span-full text-center py-8 text-muted-foreground">
									<p>Loading addons...</p>
								</div>
							)}

							{/* Error State */}
							{hasError && (
								<div className="col-span-full text-center py-8 text-red-500">
									<p>Error loading addons. Please refresh the page.</p>
								</div>
							)}

							{/* Addons Grid */}
							{!isLoading && !hasError && filteredAddons?.map((addon) => (
								<Label key={addon?._id || Math.random()} className="block">
									<Card
										onClick={() => handleAddOnToggle(addon?._id)}
										className={`relative flex flex-col items-center border transition-all duration-200 rounded-xl overflow-hidden ${selectedAddOnIds.includes(addon?._id)
											? "ring-2 ring-purple-500 shadow-lg"
											: "hover:shadow-md"
											}`}
									>
										{/* Selected Checkmark */}
										{selectedAddOnIds.includes(addon?._id) && (
											<div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow z-20">
												<CheckCircle className="text-purple-500 h-5 w-5" />
											</div>
										)}

										<div className="flex gap-4 justify-end w-full absolute top-2 px-2">
											{/* Popular Badge */}
											{addon?.popular && (
												<Badge className="bg-orange-500 text-white border-0 shadow z-10">
													🔥 Popular
												</Badge>
											)}
											{/* Price Badge */}
											<Badge className="bg-green-500 text-white border-0 shadow z-10">
												+₹ {(addon?.price || 0).toLocaleString()}
											</Badge>
										</div>

										{/* Image Section */}
										<div className="w-full h-28 bg-gray-200">
											<Image
												src={addon?.banner && Array.isArray(addon.banner) && addon.banner.length > 0 ? addon.banner[ 0 ] : "/placeholder.svg"}
												alt={addon?.name || "Addon"}
												width={400}
												height={200}
												className="object-cover w-full h-full"
											/>
										</div>

										{/* Content */}
										<CardContent className="w-full px-4 py-2">
											<h3 className="text-lg font-semibold">{addon?.name || "Addon Name"}</h3>
											<p className="text-xs text-muted-foreground mt-1 line-clamp-2">
												{addon?.description || "No description available"}
											</p>
											<div className="flex justify-between items-center mt-2">
												<span className="text-xs text-muted-foreground border px-2 rounded-md bg-gray-100">
													{addon?.duration || "Duration not specified"}
												</span>
												<p
													className="text-blue-500 text-xs cursor-pointer hover:underline"
													onClick={(e) => {
														e.stopPropagation()
														handleMoreDetails(addon)
													}}
												>
													more details
												</p>
											</div>
										</CardContent>
									</Card>
								</Label>
							))}

							{/* No addons message */}
							{!isLoading && !hasError && filteredAddons?.length === 0 && (
								<div className="col-span-full text-center py-8 text-muted-foreground">
									<p>No addons available for this category.</p>
								</div>
							)}
						</div>
					</div>

					<div className="lg:col-span-1">
						<Card className="sticky top-24 shadow-md">
							<CardContent className="p-4 space-y-3">
								<h4 className="font-semibold">Cart Summary</h4>
								<div className="flex justify-between text-sm">
									<span className="capitalize">{bookingFlow?.data?.eventTitle} </span>
									<span>₹ {bookingFlow?.data?.itemTotal?.toLocaleString()}</span>
								</div>
								{selectedAddOns?.map((addon) => (
									<div key={addon?._id} className="flex justify-between text-sm ">
										<span title={addon?.name} >{addon?.name?.substring(0, 18) + "..." || "Addon"}</span>
										<span className="text-emerald-600">+ ₹{(addon?.price || 0).toLocaleString()}</span>
									</div>
								))}
								<hr />
								<div className="flex justify-between font-bold">
									<span>Total</span>
									<span className="text-purple-600">₹ {totalPrice.toLocaleString()}</span>
								</div>
								<Button
									onClick={handleContinue}
									className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
								>
									Continue <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* More Details Dialog */}
			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="flex items-center justify-between">
							<span>{selectedAddonDetails?.name || "Addon Details"}</span>
							{/* <Button
								variant="ghost"
								size="sm"
								onClick={() => setIsDetailsOpen(false)}
								className="h-8 w-8 p-0"
							>
								<X className="h-4 w-4" />
							</Button> */}
						</DialogTitle>
					</DialogHeader>

					{selectedAddonDetails && (
						<div className="space-y-6">
							{/* Banner Images */}
							{selectedAddonDetails?.banner && Array.isArray(selectedAddonDetails.banner) && selectedAddonDetails.banner.length > 0 && (
								<div className="space-y-2">
									<h3 className="font-semibold">Images</h3>
									<div className="grid grid-cols-2 gap-2">
										{selectedAddonDetails.banner.map((image, index) => (
											<div key={index} className="relative h-32 rounded-lg overflow-hidden">
												<Image
													src={image}
													alt={`${selectedAddonDetails?.name || 'Addon'} - Image ${index + 1}`}
													fill
													className="object-cover"
												/>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Description */}
							<div className="space-y-2">
								<h3 className="font-semibold">Description</h3>
								<p className="text-muted-foreground">
									{selectedAddonDetails?.description || "No description available"}
								</p>
							</div>

							{/* Details Grid */}
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<h3 className="font-semibold">Category</h3>
									<p className="text-muted-foreground">{selectedAddonDetails?.category || "N/A"}</p>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold">Price</h3>
									<p className="text-emerald-600 font-semibold">₹{(selectedAddonDetails?.price || 0).toLocaleString()}</p>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold">Duration</h3>
									<p className="text-muted-foreground">{selectedAddonDetails?.duration || "N/A"}</p>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold">Max Quantity</h3>
									<p className="text-muted-foreground">{selectedAddonDetails?.maxQuantity || "N/A"}</p>
								</div>
							</div>

							{/* Status */}
							{/* <div className="space-y-2">
								<h3 className="font-semibold">Status</h3>
								<Badge variant={selectedAddonDetails?.isActive ? "default" : "secondary"}>
									{selectedAddonDetails?.isActive ? "Active" : "Inactive"}
								</Badge>
							</div> */}

							{/* Popular Badge */}
							{selectedAddonDetails?.popular && (
								<div className="space-y-2">
									<h3 className="font-semibold">Special</h3>
									<Badge variant="outline" className="border-orange-500 text-orange-600">
										🔥 Popular Choice
									</Badge>
								</div>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div >
	)
}