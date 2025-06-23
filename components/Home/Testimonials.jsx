// import React from 'react'
// import { Star } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// function Testimonials() {

// 	const testimonials = [
// 		{
// 			name: "Priya Sharma",
// 			location: "Mumbai",
// 			rating: 5,
// 			comment:
// 				"Absolutely amazing experience! My daughter's princess party was beyond our expectations. The team was professional and the kids had a blast!",
// 			avatar: "/placeholder.svg?height=40&width=40",
// 			event: "Princess Theme Party",
// 			date: "2 weeks ago",
// 		},
// 		{
// 			name: "Rajesh Kumar",
// 			location: "Delhi",
// 			rating: 5,
// 			comment:
// 				"Booked a superhero theme party for my son's 7th birthday. Everything was perfectly organized and the entertainment was top-notch!",
// 			avatar: "/placeholder.svg?height=40&width=40",
// 			event: "Superhero Adventure",
// 			date: "1 month ago",
// 		},
// 		{
// 			name: "Anita Patel",
// 			location: "Pune",
// 			rating: 5,
// 			comment:
// 				"The jungle safari theme was incredible! Great attention to detail and the kids were engaged throughout. Highly recommend!",
// 			avatar: "/placeholder.svg?height=40&width=40",
// 			event: "Jungle Safari Party",
// 			date: "3 weeks ago",
// 		},
// 	]

// 	return (
// 		<>
// 			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// 				{testimonials.map((testimonial, index) => (
// 					<Card
// 						key={index}
// 						className="bg-white dark:bg-card shadow-lg hover-lift animate-slide-up"
// 						style={{ animationDelay: `${index * 0.1}s` }}
// 					>
// 						<CardContent className="p-6">
// 							<div className="flex items-center mb-4">
// 								{[ ...Array(testimonial.rating) ].map((_, i) => (
// 									<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
// 								))}
// 							</div>
// 							<p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
// 							<div className="flex items-center justify-between">
// 								<div className="flex items-center">
// 									<Avatar className="h-10 w-10 mr-3">
// 										<AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
// 										<AvatarFallback>
// 											{testimonial.name.split(" ").map((n) => n[ 0 ]).join("")}
// 										</AvatarFallback>
// 									</Avatar>
// 									<div>
// 										<p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
// 										<p className="text-sm text-muted-foreground">{testimonial.location}</p>
// 									</div>
// 								</div>
// 							</div>
// 							<div className="mt-3 pt-3 border-t">
// 								<div className="flex justify-between items-center text-xs text-muted-foreground">
// 									<span>{testimonial.event}</span>
// 									<span>{testimonial.date}</span>
// 								</div>
// 							</div>
// 						</CardContent>
// 					</Card>
// 				))}
// 			</div>
// 		</>
// 	)
// }

// export default Testimonials

'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Navigation } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

function Testimonials() {

	const testimonials = [
		{
			name: 'Priya Sharma',
			location: 'Mumbai',
			rating: 5,
			comment:
				"Absolutely amazing experience! My daughter's princess party was beyond our expectations.",
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Princess Theme Party',
			date: '2 weeks ago',
		},
		{
			name: 'Rajesh Kumar',
			location: 'Delhi',
			rating: 5,
			comment:
				"Booked a superhero theme party for my son's 7th birthday. Everything was perfectly organized and the entertainment was top-notch!",
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Superhero Adventure',
			date: '1 month ago',
		},
		{
			name: 'Anita Patel',
			location: 'Pune',
			rating: 5,
			comment:
				'The jungle safari theme was incredible! Great attention to detail and the kids were engaged throughout. Highly recommend! ',
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Jungle Safari Party',
			date: '3 weeks ago',
		},
		{
			name: 'Rajesh Kumar',
			location: 'Delhi',
			rating: 5,
			comment:
				"Booked a superhero theme party for my son's 7th birthday. Everything was perfectly organized and the entertainment was top-notch!",
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Superhero Adventure',
			date: '1 month ago',
		},
		{
			name: 'Anita Patel',
			location: 'Pune',
			rating: 5,
			comment:
				'The jungle safari theme was incredible! Great attention to detail and the kids were engaged throughout. Highly recommend!',
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Jungle Safari Party',
			date: '3 weeks ago',
		},
		{
			name: 'Rajesh Kumar',
			location: 'Delhi',
			rating: 5,
			comment:
				"Booked a superhero theme party for my son's 7th birthday. Everything was perfectly organized and the entertainment was top-notch!",
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Superhero Adventure',
			date: '1 month ago',
		},
		{
			name: 'Anita Patel',
			location: 'Pune',
			rating: 5,
			comment:
				'The jungle safari theme was incredible! Great attention to detail and the kids were engaged throughout. Highly recommend!',
			avatar: '/placeholder.svg?height=40&width=40',
			event: 'Jungle Safari Party',
			date: '3 weeks ago',
		},
	]

	return (
		<div className="">
			<Swiper
				modules={[ Autoplay, Pagination, Navigation ]}
				spaceBetween={24}
				slidesPerView={1}
				// pagination={{ clickable: true }}
				navigation={true}
				pagination={{ dynamicBullets: true }}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				breakpoints={{
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}
			>
				{testimonials.map((testimonial, index) => (
					<SwiperSlide key={index}>
						<Card className="bg-white border-0 shadow-none dark:bg-card h-full mb-8">
							<CardContent className="p-6 h-full flex flex-col justify-between">
								<div>
									<div className="flex items-center mb-4">
										{[ ...Array(testimonial.rating) ].map((_, i) => (
											<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
										))}
									</div>
									<p className="text-muted-foreground mb-4 italic">
										"{testimonial.comment}"
									</p>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Avatar className="h-10 w-10 mr-3">
											<AvatarImage src={testimonial.avatar || '/placeholder.svg'} />
											<AvatarFallback>
												{testimonial.name
													.split(' ')
													.map((n) => n[ 0 ])
													.join('')}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">
												{testimonial.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{testimonial.location}
											</p>
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
					</SwiperSlide>
				))}
			</Swiper>	
		</div>
	);
}

export default Testimonials
