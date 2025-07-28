'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { MoveLeft, MoveRight } from 'lucide-react';

export default function ExperientialEventHome() {
	const swiperRef = useRef(null);
	const [ isBeginning, setIsBeginning ] = useState(true);
	const [ isEnd, setIsEnd ] = useState(false);

	const events = [
		{ heading: "Mini Chef Academy", title: "Cook up unforgettable fun!", description: "Pizza making and cupcakes." },
		{ heading: "DIY Slime & Science Party", title: "Messy, magical science for all ages.", description: "Slime and volcano experiments." },
		{ heading: "Junior Builders LEGO Party", title: "Build, compete, engineer dreams.", description: "LEGO builds and competitions." },
		{ heading: "Magical Birthday Adventure", title: "Create unforgettable memories!", description: "A fully planned magical birthday adventure with professional entertainers and activities." },
		{ heading: "Junior Scientists Workshop", title: "Create unforgettable memories!", description: "An interactive science experience with amazing experiments and discoveries." },
		{ heading: "Sports Olympiad", title: "Create unforgettable memories!", description: "A fun-filled day of sports activities and friendly competition." },
	];

	const handleSlideChange = () => {
		const swiper = swiperRef.current;
		if (!swiper) return;

		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
	};

	return (
		<div className="relative py-6">
			<Swiper
				modules={[ Navigation ]}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
					handleSlideChange();
				}}
				onSlideChange={handleSlideChange}
				spaceBetween={20}
				breakpoints={{
					320: {
						slidesPerView: 1.1,
					},
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				className="!pb-16"
			>
				{events.map((event, i) => (
					<SwiperSlide key={i}>
						<Card className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-card">
							<div className="relative">
								<Image
									src="/placeholder.svg"
									alt={event.title}
									width={300}
									height={300}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<CardContent className="p-4 flex flex-col justify-between h-48">
								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{event.heading}</h3>
									<p className="text-primary font-medium mb-1">{event.title}</p>
									<p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
								</div>
								<Button className="w-full">
									Book Now
								</Button>
							</CardContent>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="absolute bottom-4 right-4 flex gap-2 z-10">
				<Button
					variant="outline"
					disabled={isBeginning}
					onClick={() => swiperRef.current?.slidePrev()}
				>
					<MoveLeft />
				</Button>
				<Button
					disabled={isEnd}
					onClick={() => swiperRef.current?.slideNext()}
				>
					<MoveRight />
				</Button>
			</div>
		</div>
	);
}
