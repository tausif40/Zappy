"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Gem, CheckCircle, Cake, Palette, Music, ChevronRight, LucideGift, LucideSparkles, LucideHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroSection from '@/components/Home/HeroSection'
import Testimonials from "./Testimonials"
import ExperientialEventHome from "./ExperientialEventHome"

function Home() {

	const serviceCategories = [
		{
			title: "Birthday",
			description: "Magical celebrations for your little ones",
			icon: Cake,
			color: "bg-pink-100 text-pink-600",
			bgColor: "#FFDEE2",
			count: "150+ themes",
		},
		{
			title: "Experiential Events",
			description: "Experiential event with amazing themes",
			icon: Palette,
			color: "bg-purple-100 text-purple-600",
			bgColor: "#E5DEFF",
			count: "200+ options",
		},
		{
			title: "Corporate Events",
			description: "Professional entertainers and activities",
			icon: Music,
			color: "bg-yellow-100 text-yellow-600",
			bgColor: "#FEF7CD",
			count: "300+ performers",
			comingSoon: true,
		},
		{
			title: "Weddings",
			description: "Capture precious moments beautifully",
			icon: Gem,
			color: "bg-green-100 text-green-600",
			bgColor: "#F2FCE2",
			count: "100+ photographers",
			comingSoon: true,
		},
	]

	const upcomingServices = [
		{
			heading: "Corporate Events",
			title: "Professional event planning for businesses",
			description: "Team buildings, product launches, conferences, and corporate parties with professional planning and execution.",
			date: "March 2025",
			img: "/img/home/event1.png",
			features: [ "360° Gaming", "Educational VR", "Safe Environment" ],
		},
		{
			heading: "Wedding Services",
			title: "Elegant wedding planning and coordination",
			description: "Complete wedding planning services including venue selection, decoration, catering, entertainment, and more.",
			date: "April 2026",
			img: "/img/home/event2.png",
			features: [ "Console Gaming", "Dance", "Group Compotation" ],
		},
	]

	const features = [
		{
			icon: LucideGift,
			title: "Products + Services",
			description: "Premium party supplies delivered with professional setup and decoration services.",
			points: [
				"Themed decorations & supplies",
				"Professional setup service",
				"Coordinated delivery & timing",
			],
			bg: "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-200/20 dark:to-orange-200/20"
		},
		{
			icon: LucideSparkles,
			title: "Convenience",
			description: "One platform, one payment, one point of contact for your entire event needs.",
			points: [
				"Single checkout process",
				"Unified customer support",
				"Coordinated timeline",
			],
			bg: "bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-200/20 dark:to-purple-200/20"
		},
		{
			icon: LucideHeart,
			title: "Quality Guarantee",
			description: "Experience vendors and premium products ensure consistent quality across all offerings.",
			points: [
				"Vetted vendors & products",
				"Quality assurance standards",
				"Satisfaction guarantee",
			],
			bg: "bg-gradient-to-br from-lime-100 to-yellow-100 dark:from-lime-200/20 dark:to-yellow-200/20"
		},
	]


	return (
		<>
			<HeroSection />

			{/* Our Event Categories */}
			<section className="py-20 bg-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Event Categories</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover our range of carefully event services designed to create unforgettable experiences
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
						{serviceCategories.map((category, index) => (
							<Card
								key={index}
								className="group hover:shadow-md transition-all duration-300 border shadow-md hover-lift animate-slide-up dark:bg-purple-900/10"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-6 text-center relative">
									<div
										className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
										style={{ backgroundColor: category.bgColor }}
									>
										<category.icon className="w-8 h-8" style={{ color: "#9b87f5" }} />
									</div>
									{category?.comingSoon &&
										<Badge className="absolute top-2 right-2 border-amber-400 bg-[#fdf6bc] text-amber-700 text-xs font-normal">coming soon</Badge>
									}
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
									<p className="text-muted-foreground mb-3">{category.description}</p>
									<div className="flex justify-center items-center gap-4 mt-4">
										<Badge variant="secondary" className="min-w-max">
											{category.count}
										</Badge>
										<Button
											variant="ghost"
											className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors"
										>
											Explore <ChevronRight className="ml-1 h-4 w-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* created event */}
			<div className="bg-gradient-to-br from-purple-50 to-pink-50 py-6 text-gray-900 dark:text-white dark:from-purple-900/10 dark:to-pink-900/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8  py-6">
					<div className="text-center mb-12">
						{/* <!-- Main Heading --> */}
						<h1 className="text-4xl md:text-5xl font-extrabold mb-4">
							<span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Experiential Events</span>
						</h1>
						<p className="text-slate-900 text-lg mt-2 dark:text-gray-300">Extraordinary experiences, handpicked for Indian kids — forget ordinary parties!</p>
						<p className="text-slate-700 text-base mt-2 dark:text-gray-400">Discover 7 event concepts, crafted by child experts and Indian parents.</p>
						<p className="text-orange-500 font-semibold mt-1">Each event is a memorable, scalable celebration!</p>

					</div>


					<ExperientialEventHome />

					<div className="text-center col-span-3">
						<Link href='/experiential-event'>
							<Button variant='outline' size="lg" className="px-8">
								More Events
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Coming Soon Services */}
			<section className="py-20 bg-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Exciting new services and experiences we're launching soon
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-8">
						{upcomingServices.map((service, index) => (
							<Card
								key={index}
								className="border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-background overflow-hidden"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-0 text-center">
									{/* <service.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" /> */}
									{/* <img src={service?.img} alt="img" /> */}
									<div className="relative w-full h-60 overflow-hidden">
										<Image
											src={service?.img}
											alt="img"
											fill
											className="w-full h-full object-cover"
											style={{
												maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
												WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
											}}
										/>
										{/* <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-purple-50/60 to-transparent" /> */}
										<Badge className="absolute top-3 right-3 border-amber-400 bg-[#fef08a] text-amber-800 text-sm font-normal mb-4">coming soon</Badge>
									</div>

									<div className="px-8 pb-8 pt-6 relative">
										<h3 className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 min-w-max ">
											{service?.heading}
										</h3>
										<h3 className="text-ld font-semibold text-gray-800 dark:text-gray-200 mb-2">{service.title}</h3>
										<p className="text-muted-foreground mb-4">{service.description}</p>
										<div className="flex gap-6 justify-center">
											<Button size='sm' className=" text-sm px-4 py-1 font-normal mb-4 cursor-pointer rounded-full">
												Join Waiting List
											</Button>
										</div>
										<div className="flex gap-6 justify-center items-center">
											{service.features.map((feature, i) => (
												<div key={i} className="flex items-center justify-center text-sm text-muted-foreground">
													<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
													{feature}
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Featured Events */}
			{/* <section className="py-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/10 dark:to-pink-900/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Events</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Create unforgettable memories for your child with our carefully experience event packages
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{featuredEvents.map((event, index) => (
							<Card
								key={event?.id}
								className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-card hover-lift animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="relative">
									<Image
										src={event?.image || "/placeholder.svg"}
										alt={event?.title}
										width={300}
										height={200}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
										{event?.badge}
									</Badge>
									<Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">{event?.discount}</Badge>
									<Button size="icon" variant="ghost" className="absolute bottom-3 right-3 bg-white/80 hover:bg-white">
										<Heart className="h-4 w-4" />
									</Button>
								</div>
								<CardContent className="p-6">
									<div className="flex items-center justify-between mb-2">
										<Badge variant='outline' className="border-0 font-medium bg-pink-200 text-pink-800">{event?.time}</Badge>
										<div className="text-right flex gap-2 items-baseline">
											<div className="text-sm text-muted-foreground line-through">{event?.originalPrice}</div>
											<span className="text-xl font-bold text-purple-600">{event?.price}</span>
										</div>
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{event?.title}</h3>
									<p className="text-muted-foreground text-sm mb-3">{event?.description}</p>

									<div className="space-y-2">
										{event?.options?.slice(0, 3).map((option, i) => (
											<div key={i} className="flex text-muted-foreground items-center">
												<Check className="w-4 h-4 mr-2 text-green-500" />
												{option}
											</div>
										))}

										{event?.options?.length > 3 && (
											<div className="flex text-primary hover:text-purple-600 cursor-pointer">
												+{event.options.length - 3} more features
											</div>
										)}
									</div>
									<div className="flex flex-col gap-2 mt-4">
										<Button className="w-full text-sm px-4 py-1 font-normal cursor-pointer">
											Book Now
										</Button>
										<Link href={`/event-details/${event.id}`}>
											<Button variant="outline" className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"	>
												More Details
											</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-12">
						<Link href="/kids-events">
							<Button
								size="lg"
								variant="outline"
								className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
							>
								View All Events
							</Button>
						</Link>
					</div>
				</div>
			</section> */}

			{/* Why Choose us */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4">
					Why Choose Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Complete Solutions</span>?
				</h2>
				<p className="text-gray-600 mb-10 max-w-2xl mx-auto">
					Get everything you need for your perfect event – from professional services to premium products, all in one place.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{features.map((feature, idx) => (
						<Card key={idx} className={`border-0 shadow-lg rounded-md overflow-hidden ${feature.bg}`}>
							<CardContent className="p-0 text-left">
								<div className="px-8 pt-6 pb-4">
									<div className="mb-4 "><feature.icon className="text-purple-500 w-10 h-10" /></div>
									<h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
									<p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
								</div>
								<ul className="space-y-2 text-sm bg-white dark:bg-gray-800 p-4">
									{feature.points.map((point, i) => (
										<li key={i} className="flex items-center gap-2">
											<div className="bg-theme text-2xl rounded-full h-2 w-2"></div>
											<div className="text-foreground">{point}</div>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-12">
					<div className="bg-gradient-to-br from-purple-100 to-orange-100 dark:from-purple-200/40 dark:to-orange-200/40 p-8 rounded-2xl shadow-md max-w-3xl mx-auto text-center">
						<h3 className="text-2xl font-bold mb-2">
							Save 15% on Combined Bookings!
						</h3>
						<p className="text-muted-foreground mb-6">
							Book both products and services together and enjoy special bundle pricing. Perfect for stress-free event planning.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
								View Complete Packages
							</Button>
							<Button variant="outline" className="text-purple-600 border-purple-300">
								Browse Products
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* What Our Clients Say */}
			<section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Real experiences from families who trusted us with their special moments
						</p>
					</div>
					{/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="bg-white dark:bg-card shadow-lg hover-lift animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										{[ ...Array(testimonial.rating) ].map((_, i) => (
											<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
										))}
									</div>
									<p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<Avatar className="h-10 w-10 mr-3">
												<AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
												<AvatarFallback>
													{testimonial.name
														.split(" ")
														.map((n) => n[ 0 ])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">{testimonial.location}</p>
											</div>
										</div>
									</div>
									<div className="mt-3 pt-3 border-t">
										<div className="flex justify-between items-center text-xs text-muted-foreground">
											<span>{testimonial.event}</span>
											<span>{testimonial.date}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div> */}
					{/* <div className="mx-2"> */}
					<Testimonials />
					{/* </div> */}
				</div>
			</section>


			{/* Custom Package */}
			<div className="bg-purple-100 dark:bg-purple-200/10 text-center flex justify-center py-12 my-12">
				<div className="max-w-3xl">
					<p className="text-3xl px-2 font-bold">
						Need a Custom Package? <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">We can create the perfect event tailored specifically to your requirements and budget</span></p>
					<p className="text-gray-600 my-6">We can create the perfect combination of products and services tailored specifically to your requirements and budget.</p>
					<Button>Contact Us for Custom Packages</Button>
				</div>
			</div>


		</>
	)
}

export default Home