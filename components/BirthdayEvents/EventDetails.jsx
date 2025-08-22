"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, MapPin, Users, Clock, CheckCircle, ArrowLeft, Share2, Award, Shield, Gift, ChevronRight, Smile, GraduationCap, Wine, Crown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Reviews from "../Reviews/Reviews"
import EventsPlan from "./EventsPlan"
import { getBirthdayEventDetails } from "@/store/features/event-slice"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "./Gallery"
import { getDiscountedPrice } from "@/lib/utils"
import { Input } from "../ui/input"

const ageGroups = [
	{
		id: 'kids',
		text: 'Kids (1-12)',
		icon: Smile,
		options: [
			'Popular Among Boys', 'Popular Among Girls', 'All-time Classics'
		]
	},
	{
		id: 'teens',
		text: 'Teens (13-19)',
		icon: GraduationCap,
	},
	{
		id: 'adults',
		text: 'Adults (20+)',
		icon: Wine,
	},
	{
		id: 'milestone',
		text: 'Milestone',
		icon: Crown,
	},
];

export default function EventDetails() {
	const params = useParams();
	const dispatch = useDispatch()
	const eventId = params.id
	const { toast } = useToast()
	const [ guist, setGuist ] = useState('');
	const [ event, setEvent ] = useState([]);

	const birthdayEventDetails = useSelector((state) => state.event.birthdayEventDetails);
	// console.log("event details - ", birthdayEventDetails?.data?.event);	

	useEffect(() => {
		setEvent(birthdayEventDetails?.data?.event || [])
	}, [ birthdayEventDetails ]);

	useEffect(() => {
		dispatch(getBirthdayEventDetails(eventId))
	}, [ eventId, dispatch ]);


	const getAgeGroupText = (age) => {
		const group = ageGroups.find((item) => item.id === age);
		return group?.text;
	}

	const handleShare = () => {
		toast({
			title: "Link Copied!",
			description: "Event link copied to clipboard.",
		})
	}

	const tierStyles = {
		silver: {
			borderColor: "border-gray-400",
			textColor: "text-gray-500",
			color: "text-gray-600"
		},
		gold: {
			borderColor: "border-purple-400",
			textColor: "text-purple-500",
			color: "text-purple-600"
		},
		platinum: {
			borderColor: "border-yellow-400",
			textColor: "text-yellow-500",
			color: "text-yellow-600"
		}
	};


	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: event?.title, href: `/birthday/details/${eventId}` },
	];



	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Breadcrumb */}
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

			<div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8 pt-8 pb-16">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Link href="/birthday">
						<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Events
						</Button>
					</Link>
					<Button variant="ghost" onClick={handleShare} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
						<Share2 className="mr-2 h-4 w-4" />
						Share
					</Button>
				</div>

				<div className="grid lg:grid-cols-5 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-3">

						{/* Event Details */}
						<Card className="shadow overflow-hidden">
							<CardContent className="relative p-0 ">
								{/* <Badge className="absolute z-10 top-4 right-4 bg-green-500 text-white border-0">{event?.discount}% OFF</Badge> */}
								{event?.tags &&
									<Badge className="absolute top-6 left-6 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 capitalize">
										{event?.tags}
									</Badge>
								}
								<Gallery images={birthdayEventDetails?.data?.event?.banner} />
								<div className="px-4 md:px-8 py-6">
									<div className="flex items-start justify-between mb-6">
										<div>
											<h1 className="text-3xl font-bold text-foreground mb-2">{event?.title}</h1>
											<div className="flex items-center flex-wrap gap-4 text-muted-foreground">
												<div className="flex items-center">
													<MapPin className="h-4 w-4 mr-1" />
													{event?.city}
												</div>
												<div className="flex items-center">
													<Users className="h-4 w-4 mr-1" />
													{getAgeGroupText(event?.ageGroup)}
												</div>

												<div className="flex items-center">
													<Clock className="h-4 w-4 mr-1" />
													{event?.duration} Hours
												</div>
												<Badge variant="secondary" className="py-1 px-2 bg-gray-200 dark:bg-gray-800">{guist} persons</Badge>
											</div>
										</div>
										<div className="text-muted-foreground hover:text-red-500">
											<Heart className="h-6 w-6" />
										</div>
									</div>

									<div className="flex items-center space-x-2">
										{event?.rating > 0 &&
											<div className="flex items-center">
												<Star className="h-5 w-5 text-yellow-400 fill-current" />
												<span className="ml-1 font-semibold">{event?.rating}</span>
												<span className="ml-1 text-muted-foreground">({event?.reviews} reviews)</span>
											</div>
										}
										{/* <div>
											Max Guests: &nbsp;
										</div> */}
									</div>

									<div className="lg:hidden">
										<EventsPlan event={event?.tiers} discount={event?.discount} guist={setGuist} />
									</div>

									<p className="text-muted-foreground leading-relaxed mb-6 mt-10 lg:mt-0">{event?.description}</p>

									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{event?.tiers?.map((tier) => {
											const style = tierStyles[ tier.name.toLowerCase() ] || {
												borderColor: "border-muted",
												textColor: "text-foreground"
											};
											return (
												// shadow rounded-2xl ${style.borderColor}
												<Card key={tier?._id} className={`border-0 shadow-none`}>
													<CardHeader className="px-5 pb-2 pt-4">
														<CardTitle className={`capitalize text-xl flex items-center justify-between ${style.textColor}`}>
															{tier?.name}
														</CardTitle>
													</CardHeader>
													<CardContent className="">
														<Badge variant="secondary">{tier?.guest} Guests</Badge>
														<ul className="space-y-2 mt-4">
															{tier?.features?.map((feature, idx) => (
																<li key={idx} className="flex items-center text-sm">
																	<CheckCircle className={`w-4 h-4 mr-2 ${style.color}`} />
																	<p className="text-muted-foreground">{feature}</p>
																</li>
															))}
														</ul>
													</CardContent>
												</Card>
											)
										})}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Reviews */}
						<Reviews />
					</div>


					{/* Sidebar */}
					<div className="space-y-6 lg:col-span-2  sticky top-24 ">
						<div className="hidden lg:block">
							<EventsPlan event={event?.tiers} discount={event?.discount} guist={setGuist} />
						</div>

						{/* Safety Features */}
						<Card className="shadow">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-4">Safety & Trust</h3>
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<Shield className="h-5 w-5 text-green-500" />
										<span className="text-sm">Verified vendor</span>
									</div>
									<div className="flex items-center space-x-3">
										<CheckCircle className="h-5 w-5 text-green-500" />
										<span className="text-sm">Background checked</span>
									</div>
									<div className="flex items-center space-x-3">
										<Award className="h-5 w-5 text-green-500" />
										<span className="text-sm">Quality guaranteed</span>
									</div>
									<div className="flex items-center space-x-3">
										<Gift className="h-5 w-5 text-green-500" />
										<span className="text-sm">Secure payments</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

				</div>
			</div>
		</div>
	)
}
