"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star, Users, SlidersHorizontal, Check, Smile, GraduationCap, Wine, Crown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import EventFilter from "./EventFilter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useDispatch, useSelector } from "react-redux"
import { getBirthdayEvent } from "@/store/features/event-slice"
import { setFilter } from "@/store/features/event-slice"
import { useSearchParams } from "next/navigation"
import BirthdaySkeleton from "@/components/Skeleton/Birthday"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


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

export default function BirthdayEvents() {
	const dispatch = useDispatch()
	const [ birthdayEvents, setBirthdayEvents ] = useState([])
	const [ activeButton, setActiveButton ] = useState('Kids');

	const birthdayEvent = useSelector((state) => state.event.birthdayEvent);
	const birthdayFilter = useSelector((state) => state.event.birthdayEventFilter);

	useEffect(() => {
		setBirthdayEvents(birthdayEvent?.data)
	}, [ birthdayEvent ]);

	// console.log("isLoading: ", birthdayEvent?.isLoading);
	// console.log("store: ", birthdayEvent);
	// console.log("useEffect: ", birthdayEvents);
	console.log("filter: ", birthdayFilter);

	useEffect(() => {
		dispatch(getBirthdayEvent(birthdayFilter))
	}, [ birthdayFilter, dispatch ])

	const handleChangeFilter = (key, value) => {
		dispatch(setFilter({
			...birthdayFilter,
			[ key ]: value
		}))
	}


	const getDiscountedPrice = (price, discount) => {
		if (!price || !discount) return price;

		const discountedPrice = price - (price * discount) / 100;
		return Math.round(discountedPrice);
	}

	const getAgeGroupText = (age) => {
		const group = ageGroups.find((item) => item.id === age);
		return group?.text;
	}

	const { page = 1, limit = 10, total = 0 } = birthdayFilter
	const totalPages = Math.ceil(total / limit)


	const goToNextPage = () => {
		if (page < totalPages) {
			dispatch(setFilter({ ...birthdayFilter, page: page + 1 }))
		}
	}

	const goToPrevPage = () => {
		if (page > 1) {
			dispatch(setFilter({ ...birthdayFilter, page: page - 1 }))
		}
	}


	return (
		<div className="min-h-screen py-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Birthday Events
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Discover amazing themed parties and events designed to create magical memories for you
						</p>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto flex flex-wrap justify-center mt-6 gap-4">
							{/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search for themes, vendors, or locations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-6 text-lg border-2 focus:border-purple-500 rounded-full"
							/> */}
							{ageGroups.map((button) => {
								const isActive = activeButton === button.id;
								return (
									<>
										<Button key={button.id} onClick={() => setActiveButton(button.id)}
											className={`${isActive ? 'bg-purple-400 text-white shadow-md' : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50 hover:border-purple-400'}`
											}>
											<button.icon className="w-5 h-5 md:w-6 md:h-6" />
											<span>{button.text}</span>
										</Button>
									</>
								)
							})}
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar - Desktop */}
					<div className="hidden lg:block w-72 h-96 space-y-6 sticky top-20">
						<EventFilter />
					</div>

					{/* Main Content */}
					<div className="flex-1">
						{/* Mobile Filters */}
						<div className="lg:hidden mb-6">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" className="w-full">
										<SlidersHorizontal className="mr-2 h-4 w-4" />
										Filters
									</Button>
								</SheetTrigger>
								<SheetContent side="left" className="w-80">
									<div className="space-y-6 mt-6">
										<h3 className="text-lg font-semibold">Filters</h3>
										<EventFilter />
									</div>
								</SheetContent>
							</Sheet>
						</div>

						{/* Results Header */}
						<div className="flex justify-between items-center mb-6">
							<p className="text-muted-foreground">Showing {birthdayEvents.length} events</p>
							<Select defaultValue="popular">
								<SelectTrigger className="w-48">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="popular">Most Popular</SelectItem>
									<SelectItem value="price-low">Price: Low to High</SelectItem>
									<SelectItem value="price-high">Price: High to Low</SelectItem>
									<SelectItem value="rating">Highest Rated</SelectItem>
									<SelectItem value="newest">Newest First</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Events Grid */}
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

							{birthdayEvent?.isLoading
								? <>{Array.from({ length: 6 }).map((_, ind) => (
									<BirthdaySkeleton key={ind} />
								))}</>
								: birthdayEvents?.results?.map((event) => (
									<Card
										key={event?._id}
										className="group hover:shadow-md transition-all duration-300 overflow-hidden bg-white dark:bg-card"
									>
										<div className="relative">
											<Link href={`/birthday/details/${event?._id}`}>
												<Image
													src={event?.banner[ 0 ] || "/placeholder.svg"}
													alt={event?.title}
													width={300}
													height={200}
													className="w-full h-48 object-cover transition-transform duration-300 cursor-default"
												/>
											</Link>
											{event?.tags &&
												<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 capitalize">
													{event?.tags}
												</Badge>
											}

											{/* <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">{event?.discount}</Badge> */}

											<Button variant='ghost' className="absolute top-3 right-3 p-1 h-6 rounded-[4px] bg-opacity-50">
												<Heart className="h-4 w-4 text-white hover:text-gray-800" />
											</Button>

											<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
												{event?.duration} hour
											</div>
										</div>
										<CardContent className="px-5 pt-3">

											<Link href={`/birthday/details/${event?._id}`}>
												<h3 className="text-xl font-semibold text-gray-800 hover:text-blue-800 transition-all dark:text-white mb-1 line-clamp-1 cursor-pointer capitalize">{event?.title}</h3>
											</Link>
											<p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event?.description}</p>

											<div className="flex items-center justify-between mb-2">
												{/* <Badge variant='outline' className="border-0 font-medium bg-pink-200 text-pink-800">{event?.time}</Badge> */}
												<div className="text-right flex gap-2 items-baseline">
													<p className="text-2xl font-semibold text-gray-800">₹ </p>
													<span className="text-xl font-bold text-purple-600">{getDiscountedPrice(event?.tiers[ 0 ]?.price, event?.discount)}</span>
													{event?.discount > 0 && <div className="text-sm text-muted-foreground line-through">{event?.tiers[ 0 ]?.price}</div>}
												</div>
												{/* <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
												{event.time}
											</div> */}
												{event?.discount > 0 && <Badge className="bg-green-500 text-white border-0">{event?.discount}% OFF</Badge>}
											</div>


											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center text-sm text-muted-foreground">
													<Users className="h-3 w-3 mr-1 text-purple-600" />
													<span className="font-semibold">Age:&nbsp;</span> {getAgeGroupText(event?.ageGroup)}
												</div>
												{event?.rating > 0 && <div className="flex items-center">
													<Star className="h-4 w-4 text-yellow-400 fill-current" />
													<span className="ml-1 font-medium text-sm">{event?.rating}</span>
													<span className="ml-1 text-xs text-muted-foreground">({event?.reviews})</span>
												</div>}
											</div>

											<div className="space-y-2">
												{event?.tiers[ 0 ]?.features?.slice(0, 3).map((option, i) => (
													<div key={i} className="flex text-muted-foreground items-center text-sm">
														<Check className="w-4 h-4 mr-2 text-green-500" />
														{option}
													</div>
												))}

												{event?.options?.length > 3 && (
													<div className="flex text-primary hover:text-purple-600 cursor-pointer text-sm">
														+{event?.options.length - 3} more features
													</div>
												)}
											</div>
											<div className="flex flex-col gap-2 mt-4">
												<Link href={`/birthday/details/${event?._id}`}>
													<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
														Book Now
													</Button>
												</Link>
												{/* <Link href={`/birthday/details/${event?.id}`}>
												<Button variant="outline" className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"	>
													More Details
												</Button>
											</Link> */}
											</div>
										</CardContent>
									</Card>
								))}
						</div>

						<div>
							{totalPages > 1 && (
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious onClick={goToPrevPage} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
										</PaginationItem>
										<PaginationItem className="px-4 py-2 text-sm">
											Page {page} of {totalPages}
										</PaginationItem>
										<PaginationItem>
											<PaginationNext onClick={goToNextPage} className={page === totalPages ? "pointer-events-none opacity-50" : ""} />
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							)}

						</div>

						{/* Load More */}
						<div className="text-center mt-12">
							<Button variant="secondary" size="lg" className="px-8">
								Load More Events
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
