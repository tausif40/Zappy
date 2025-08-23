import React, { useEffect, useState } from 'react'
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from 'next/navigation'
import { getDiscountedPrice } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getToCart } from '@/store/features/Purchase-slice'
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from "lucide-react"

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
		text: "text-yellow-600",
		color: "border-yellow-400 bg-yellow-50 dark:bg-[#7a3702]/50",
		buttonColor: "bg-yellow-500 hover:bg-yellow-600",
	},
	{
		name: "platinum",
		subtitle: "Premium",
		text: "text-[#8B5E3C]",
		color: "bg-[#fff0eb] border-[#bd573e] dark:bg-[#330e02]/50",
		buttonColor: "bg-[#c36953] hover:bg-[#bd573e]",
	},
];

function EventsPlan({ event, discount }) {
	const params = useParams();
	const route = useRouter();
	const dispatch = useDispatch();
	const { toast } = useToast();
	const eventId = atob(decodeURIComponent(params.id));

	const [ selected, setSelected ] = useState("silver");
	const [ plans, setPlans ] = useState([]);
	const [ isAddingToCart, setIsAddingToCart ] = useState(false);

	useEffect(() => {
		setPlans(event);
	}, [ event, eventId ])

	const selectedTier = plans?.find((tier) => tier?.name === selected);
	const selectedPlanData = planSubdata?.find((plan) => plan?.name === selected);

	// useEffect(() => {
	// 	guist(selectedTier?.guest)
	// }, [ selectedTier ])

	// console.log("event-", event);

	const handelPurchase = async () => {
		if (!selectedTier) {
			toast({ variant: "destructive", title: "Error", description: "Please select a plan first." });
			return;
		}

		console.log("selectedTier-", selectedTier);

		setIsAddingToCart(true);

		const cartData = {
			eventId: eventId,
			eventTitle: selectedTier?.name,
			selectedTierId: selectedTier?._id
		}
		console.log(cartData);

		try {
			const res = await dispatch(addToCart(cartData)).unwrap();
			console.log(res);
			if (res.status === 201) {
				const ids = encodeURIComponent(btoa(`${eventId}:${res?.data?.id}`));
				route.push(`/birthday/booking/${ids}/add-ons`);
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
									className={`flex-1 p-3 md:p-4 rounded-xl border  ${selected === tier?.name ? selectedPlanData?.color : "border-border"}`}
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
								<Badge className="bg-green-500 text-white border-0">{discount}% OFF</Badge>
							</div>

							<div className="flex items-center mt-4 text-sm justify-between">
								<span className="text-muted-foreground">Max Guests:</span>
								<span className="font-medium">{selectedTier?.guest} person</span>
							</div>

							<Button
								className={`w-full !mt-6 text-white px-6 py-2 shadow ${selectedPlanData?.buttonColor}`}
								onClick={handelPurchase}
								disabled={isAddingToCart}
							>
								{isAddingToCart ? <>Booking &nbsp; <LoaderCircle className="animate-spin h-4 w-4 mr-2" /> </> : ('Book Now')}
							</Button>

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