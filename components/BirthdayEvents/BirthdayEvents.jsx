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
import { getDiscountedPrice } from "@/lib/utils"


const ageGroups = [
	{
		id: 'kids',
		text: 'Kids (1-12)',
		icon: Smile,
		options: [
			{ key: 'All-time Classics', name: 'All-time Classics' },
			{ key: 'Popular Among Boys', name: 'Popular Among Boys' },
			{ key: 'Popular Among Girls', name: 'Popular Among Girls' },
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
	const [ activeButton, setActiveButton ] = useState('');
	const [ selectedKidsOption, setSelectedKidsOption ] = useState('All-time Classics');

	const birthdayEvent = useSelector((state) => state.event.birthdayEvent);
	const birthdayFilter = useSelector((state) => state.event.birthdayEventFilter);

	useEffect(() => {
		setBirthdayEvents(birthdayEvent?.data)
	}, [ birthdayEvent ]);

	// console.log("lenght: ", birthdayEvent?.data?.totalResults);
	// console.log("store: ", birthdayEvent);
	// console.log("useEffect: ", birthdayEvents);

	useEffect(() => {
		console.log("birthdayFilter: ", birthdayFilter);
		dispatch(getBirthdayEvent(birthdayFilter))
	}, [ birthdayFilter, dispatch ])

	// Initialize filter with default values
	useEffect(() => {
		if (activeButton && !birthdayFilter.ageGroup) {
			handleChangeFilter('ageGroup', activeButton);
		}
	}, []);

	// Handle filter submissions from EventFilter
	const handleFilterSubmit = (filterData) => {
		console.log("Received filter data:", filterData);

		// Update the filter with the new data
		dispatch(setFilter({
			...birthdayFilter,
			city: filterData.city,
			priceRange: filterData.priceRange,
			// Add other filter fields as needed
		}));
	};


	// useEffect(() => {
	// 	dispatch(setFilter({
	// 		...birthdayFilter,
	// 		ageGroup: activeButton,
	// 		subCategory: selectedKidsOption
	// 	}))
	// }, [ activeButton, selectedKidsOption ])

	const handleChangeFilter = (key, value) => {
		// console.log(`[${key} ]: ${value},`)
		if (key === 'ageGroup') {
			dispatch(setFilter({
				...birthdayFilter,
				ageGroup: value,
				subCategory: value === 'kids' ? selectedKidsOption : '',
			}))
		}
		else if (key === 'subCategory') {
			dispatch(setFilter({
				...birthdayFilter,
				subCategory: value,
			}))
		}
		else {
			dispatch(setFilter({
				...birthdayFilter,
				[ key ]: value,
			}))
		}
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
							{ageGroups.map((button) => {
								const isActive = activeButton === button.id;
								return (
									<Button
										key={button.id}
										onClick={() => {
											setActiveButton(button.id)
											handleChangeFilter('ageGroup', button.id);
										}}
										className={`${isActive ? 'bg-purple-400 text-white shadow-md' : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50 hover:border-purple-400'}`}
									>
										<button.icon className="w-5 h-5 md:w-6 md:h-6" />
										<span>{button.text}</span>
									</Button>
								)
							})}
						</div>

						{/* Age Group Options - Show when kids is selected */}
						<div className="min-h-10 mt-6 ">
							{activeButton === 'kids' && (
								<div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-3">
									{ageGroups.find(group => group.id === 'kids')?.options?.map((option) => (
										<Button
											key={option.key}
											size="sm"
											onClick={() => {
												setSelectedKidsOption(option.key);
												handleChangeFilter('subCategory', option.key);
											}}
											className={`${selectedKidsOption === option.key
												? 'bg-purple-500 text-white border-purple-500 shadow'
												: 'bg-white backdrop-blur-sm border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300'
												}`}
										>
											{option.name}
										</Button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar - Desktop */}
					<div className="hidden lg:block w-72 h-96 space-y-6 sticky top-20">
						<EventFilter onSubmitFilters={handleFilterSubmit} />
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
										<EventFilter onSubmitFilters={handleFilterSubmit} />
									</div>
								</SheetContent>
							</Sheet>
						</div>

						{/* Results Header */}
						<div className="flex justify-between items-center mb-6">
							<p className="text-muted-foreground">Showing {birthdayEvent?.data?.totalResults} events</p>
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
								: birthdayEvents?.results && birthdayEvents?.results?.length === 0
									? <div className="col-span-full text-center py-16 bg-slate-50 rounded-md">
										<div className="max-w-md mx-auto">
											<div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
												<svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
												</svg>
											</div>
											<h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
											<p className="text-gray-500 mb-6">We couldn't find any events matching your current filters. Try adjusting your search criteria.</p>
											{/* <Button
													variant="outline"
													onClick={() => {
														// Reset filters to default
														handleChangeFilter('ageGroup', '');
														handleChangeFilter('subCategory', '');
														setActiveButton('');
														setSelectedKidsOption('all');
													}}
												>
													Clear Filters
												</Button> */}
										</div>
									</div>
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

												<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
													{event?.duration} hour
												</div>
											</div>

											<CardContent className="px-5 pt-3 flex flex-col justify-between">
												<div className="">
													<Link href={`/birthday/details/${event?._id}`}>
														<h3 className="text-xl font-semibold text-gray-800 hover:text-blue-800 transition-all dark:text-white mb-1 line-clamp-1 cursor-pointer capitalize">{event?.title}</h3>
													</Link>
													<p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event?.description}</p>

													<div className="flex items-center justify-between mb-2">
														{/* <Badge variant='outline' className="border-0 font-medium bg-pink-200 text-pink-800">{event?.time}</Badbar> */}
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
												</div>

												<div className="flex gap-2 mt-4 w-full">
													<Button variant="outline" className="w-10 h-10 flex items-center justify-center">
														<Heart className="h-4 w-4 text-muted-foreground" />
													</Button>

													<Link href={`/birthday/details/${event?._id}`} className="flex-1">
														<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
															Book Now
														</Button>
													</Link>
												</div>
											</CardContent>
										</Card>
									))
							}
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
