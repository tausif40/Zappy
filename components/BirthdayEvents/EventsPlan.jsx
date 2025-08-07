import React, { useEffect, useState } from 'react'
import { Clock, CalendarDays, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getDiscountedPrice } from '@/lib/utils'

function EventsPlan({ event, discount, guist }) {
	const params = useParams();
	const eventId = params.id;

	const planSubdata = [
		{
			name: "silver",
			subtitle: "Basic",
			text: "text-ring",
			color: "border-ring bg-highlights",
			buttonColor: "bg-primary",
		},
		{
			name: "gold",
			subtitle: "Enhanced",
			text: "text-purple-600",
			color: "border-purple-400 bg-purple-50 dark:bg-[#160226]",
			buttonColor: "bg-purple-500 hover:bg-purple-600",
		},
		{
			name: "platinum",
			subtitle: "Premium",
			text: "text-yellow-600",
			color: "border-yellow-400 bg-yellow-50 dark:bg-[#2e1400]",
			buttonColor: "bg-yellow-500 hover:bg-yellow-600",
		},
	];

	const [ selected, setSelected ] = useState("silver");
	const [ plans, setPlans ] = useState([]);

	useEffect(() => {
		setPlans(event);
	}, [ event, eventId ])

	const selectedTier = plans?.find((tier) => tier?.name === selected);
	const selectedPlanData = planSubdata?.find((plan) => plan?.name === selected);

	console.log("event plans-", plans);
	// console.log("selected plans-", selected);
	console.log("selectedTier-", selectedTier);

	useEffect(() => {
		guist(selectedTier?.guest)
	}, [ selectedTier ])


	return (
		<>
			<div className=" bg-background text-foreground space-y-6">
				<Card className="rounded-2xl p-4">
					<h2 className="text-xl font-bold mb-4">Select Your Plan</h2>
					<div className="flex space-x-4">
						{plans?.map((tier, i) => {
							const tierPlanData = planSubdata?.find((plan) => plan?.name === tier?.name);
							return (
								<button
									key={tier?.name}
									onClick={() => setSelected(tier?.name)}
									className={`flex-1 p-4 rounded-xl border  ${selected === tier?.name ? selectedPlanData?.color : "border-border"}`}
								>
									<div className="text-lg font-semibold capitalize">{tier?.name}</div>
									<div className="text-sm text-muted-foreground">{tierPlanData?.subtitle}</div>
								</button>
							);
						})}
					</div>
					<p className="mt-4 text-sm text-muted-foreground">
						{selectedTier?.description}
					</p>
				</Card>

				{selectedTier && (
					<Card className={`rounded-2xl border-2 ${selectedPlanData?.color}`}>
						<CardContent className="pt-2">
							<div className="flex justify-between items-center text-xl font-bold mt-2">
								<p>Price</p>
								<Badge className={`font-medium ${selectedPlanData?.buttonColor}`}>
									{selectedTier.name.toUpperCase()}
								</Badge>
							</div>
							<div className='mt-2'>
								<span className="text-3xl font-bold text-foreground">₹ {getDiscountedPrice(selectedTier.price, discount)} &nbsp;</span>
								<span className="text-lg text-muted-foreground line-through">{selectedTier.price}</span>&nbsp;&nbsp;
								{/* <Badge className="bg-green-500 text-white border-0">{discount}% OFF</Badge> */}
							</div>

							{/* <div className="flex space-x-6 items-center text-sm text-muted-foreground">
								<div className="flex items-center space-x-2">
									<Clock size={16} />
									<span>{selectedTier.duration}</span>
								</div>
								<div className="flex items-center space-x-2">
									<CalendarDays size={16} />
									<span>{selectedTier.ageRange}</span>
								</div>
							</div> */}

							<div className="flex items-center mt-4 text-sm justify-between">
								<span className="text-muted-foreground">Max Guests:</span>
								<span className="font-medium">{selectedTier?.guest} person</span>
							</div>

							<Link href={`/birthday/booking/${eventId}/add-ons`}>
								<Button className={`w-full !mt-6 text-white px-6 py-2 shadow ${selectedPlanData?.buttonColor}`}>
									Book Now
								</Button>
							</Link>

							{/* <div className="space-y-3 text-sm px-2 pt-6">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Duration:</span>
									<span className="font-medium">{event?.duration}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Max Guests:</span>
									<span className="font-medium">{selectedTier?.guest} person</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Age Group</span>
									<span className="font-medium">{event?.ageGroup}</span>
								</div>
							</div> */}

							<div>
								<p className='font-semibold text-lg text-foreground my-3'>Features:</p>
								<div className='space-y-2'>
									{selectedTier?.features.map((feature, ind) => (
										<div key={ind} className='flex gap-3 items-center'>
											<CheckCircle className={`h-4 w-4 ${selectedPlanData?.text}`} />
											<p className="text-muted-foreground">{feature}</p>
										</div>
									))}
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