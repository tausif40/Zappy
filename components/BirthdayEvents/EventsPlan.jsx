import React, { useState } from 'react'
import { Clock, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams } from 'next/navigation'
import Link from 'next/link'

function EventsPlan({ event }) {
	const params = useParams();
	const eventId = params.id;

	const plans = [
		{
			name: "Silver",
			subtitle: "Basic",
			description: "Essential services with basic venue setup",
			price: 9999,
			originalPrice: 12999,
			duration: "2.5 hours",
			ageRange: "Ages 6-12",
			tier: "SILVER",
			color: "border-ring bg-highlights",
			buttonColor: "bg-primary",
		},
		{
			name: "Gold",
			subtitle: "Enhanced",
			description: "Enhanced services with better setup",
			price: 14999,
			originalPrice: 16999,
			duration: "3 hours",
			ageRange: "Ages 7-13",
			tier: "GOLD",
			color: "border-purple-400 bg-purple-50",
			buttonColor: "bg-purple-500 hover:bg-purple-600",
		},
		{
			name: "Platinum",
			subtitle: "Premium",
			description: "Premium services with complete setup",
			price: 19999,
			originalPrice: 24999,
			duration: "4 hours",
			ageRange: "Ages 8-14",
			tier: "PLATINUM",
			color: "border-yellow-400 bg-yellow-50",
			buttonColor: "bg-yellow-500 hover:bg-yellow-600",

		},
	];

	const [ selected, setSelected ] = useState("Silver");
	const selectedTier = plans.find((tier) => tier.name === selected);

	return (
		<>
			<div className=" bg-background text-foreground space-y-6">
				<Card className="rounded-2xl p-4">
					<h2 className="text-xl font-bold mb-4">Select Your Plan</h2>
					<div className="flex space-x-4">
						{plans.map((tier) => (
							<button
								key={tier.name}
								onClick={() => setSelected(tier.name)}
								className={`flex-1 p-4 rounded-xl border  ${selected === tier.name ? tier.color : "border-border"}`}
							>
								<div className="text-lg font-semibold">{tier.name}</div>
								<div className="text-sm text-muted-foreground">{tier.subtitle}</div>
							</button>
						))}
					</div>
					<p className="mt-4 text-sm text-muted-foreground">
						{selectedTier?.description}
					</p>
				</Card>

				{selectedTier && (
					<Card className={`rounded-2xl border-2 ${selectedTier.color}`}>
						<CardContent className="space-y-2 pt-4">
							<div className="flex justify-between items-center text-xl font-bold">
								<p>Price</p>
								<Badge className={`font-medium ${selectedTier.buttonColor}`}>
									{selectedTier.tier}
								</Badge>
							</div>
							<div>
								<span className="text-3xl font-bold text-foreground">₹{selectedTier.price.toLocaleString()} &nbsp;</span>
								<span className="text-lg text-muted-foreground line-through">{selectedTier.originalPrice}</span>
							</div>

							<div className="flex space-x-6 items-center text-sm text-muted-foreground">
								<div className="flex items-center space-x-2">
									<Clock size={16} />
									<span>{selectedTier.duration}</span>
								</div>
								<div className="flex items-center space-x-2">
									<CalendarDays size={16} />
									<span>{selectedTier.ageRange}</span>
								</div>
							</div>

							<Link href={`/birthday/booking/${eventId}/add-ons`}>
								<Button className={`w-full !mt-6 text-white px-6 py-2 shadow ${selectedTier.buttonColor}`}>
									Book Now
								</Button>
							</Link>

							<div className="space-y-3 text-sm px-2 pt-6">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Duration:</span>
									<span className="font-medium">{event?.duration}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Max Guests:</span>
									<span className="font-medium">{event?.maxGuests}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Age Group</span>
									<span className="font-medium">{event?.ageGroup}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</>
	)
}

export default EventsPlan