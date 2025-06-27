"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AddOns() {
	const params = useParams()
	const route = useRouter()
	const eventId = params.id
	const { toast } = useToast()
	const [ selectedAddOnIds, setSelectedAddOnIds ] = useState([])

	const allAddOns = [
		{
			id: 1,
			name: "Photography",
			price: 5000,
			description: "Professional event photography service with editing.",
			imageUrl: "/placeholder.svg",
		},
		{
			id: 2,
			name: "Catering Service",
			price: 8000,
			description: "Delicious buffet meals with customizable menu options.",
			imageUrl: "/placeholder.svg",
		},
		{
			id: 3,
			name: "Live Music Band",
			price: 6000,
			description: "Live performance by professional musicians for a lively atmosphere.",
			imageUrl: "/placeholder.svg",
		},
		{
			id: 4,
			name: "Decoration",
			price: 4000,
			description: "Beautiful theme-based event decoration setup.",
			imageUrl: "/placeholder.svg",
		},
		{
			id: 5,
			name: "Extra Chairs & Tables",
			price: 1500,
			description: "Additional seating arrangement for extra guests.",
			imageUrl: "/placeholder.svg",
		},
		{
			id: 6,
			name: "Lighting Effects",
			price: 2000,
			description: "Special lighting effects to enhance the event ambiance.",
			imageUrl: "/placeholder.svg",
		},
	]

	const basePrice = 8999

	const handleAddOnToggle = (id) => {
		setSelectedAddOnIds((prev) =>
			prev.includes(id) ? prev.filter((addOnId) => addOnId !== id) : [ ...prev, id ]
		)
	}

	const selectedAddOns = allAddOns.filter((addOn) => selectedAddOnIds.includes(addOn.id))
	const totalPrice = basePrice + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)

	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: 'Princess Theme Birthday Party', href: '/' },
		{ name: 'Choose Theme', href: '/' },
		{ name: 'Add-Ons', href: '' },
	];

	const handleContinue = () => {
		if (selectedAddOnIds.length === 0) {
			toast({
				title: "Add-On Required",
				description: "Please select at least one add-on to continue.",
				variant: "destructive",
			})
			return
		}
		route.push(`/birthday/booking/${eventId}/schedule`)
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
						Back to Themes
					</Button>
					<span className="text-sm text-muted-foreground">Step 2 of 4: Chose Add-Ons</span>
				</div>

				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">Choose Your Theme</h1>
					<p className="text-muted-foreground text-sm">
						Choose Add-Ons for Your Event
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-8 ">
					<div className="lg:col-span-3 grid md:grid-cols-4 gap-6 p-4 bg-highlights rounded-lg">
						{allAddOns.map((addon) => (
							<Label key={addon.id} className="block">
								<Card
									onClick={() => handleAddOnToggle(addon.id)}
									className={`relative flex flex-col items-center border transition-all duration-200 rounded-xl overflow-hidden ${selectedAddOnIds.includes(addon.id)
										? "ring-2 ring-purple-500 shadow-lg"
										: "hover:shadow-md"
										}`}
								>
									{/* Selected Checkmark */}
									{selectedAddOnIds.includes(addon.id) && (
										<div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow">
											<CheckCircle className="text-purple-500 h-5 w-5" />
										</div>
									)}

									{/* Price Badge */}
									<Badge className="absolute top-2 right-2 bg-green-500 text-white border-0 shadow">
										+₹{addon.price.toLocaleString()}
									</Badge>

									{/* Image Section */}
									<div className="w-full h-28 bg-gray-200">
										<Image
											src={addon.imageUrl || "/placeholder.svg"}
											alt={addon.name}
											width={400}
											height={200}
											className="object-cover w-full h-full"
										/>
									</div>

									{/* Content */}
									<CardContent className="w-full px-4 py-2">
										<h3 className="text-lg font-semibold">{addon.name}</h3>
										<p className="text-xs text-muted-foreground mt-1 line-clamp-2">{addon.description}</p>
										<p className="text-blue-500 mt-2 text-end font-light cursor-pointer hover:underline">more details</p>

									</CardContent>
								</Card>
							</Label>
						))}
					</div>

					<div className="lg:col-span-1">
						<Card className="sticky top-24 shadow-lg">
							<CardContent className="p-4 space-y-3">
								<h4 className="font-semibold">Cart Summary</h4>
								<div className="flex justify-between text-sm">
									<span>Base Package</span>
									<span>₹{basePrice.toLocaleString()}</span>
								</div>
								{selectedAddOns.map((addon) => (
									<div key={addon.id} className="flex justify-between text-sm ">
										<span>{addon.name}</span>
										<span className="text-emerald-600">+ ₹{addon.price.toLocaleString()}</span>
									</div>
								))}
								<hr />
								<div className="flex justify-between font-bold">
									<span>Total</span>
									<span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
								</div>
								<Button
									onClick={handleContinue}
									disabled={selectedAddOnIds.length === 0}
									className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
								>
									Continue <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div >
	)
}