import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';

function EventCard() {

	const events = [
		{
			heading: "Mini Chef Academy",
			title: "Cook up unforgettable fun!",
			description: "Pizza making and cupcakes.",
		},
		{
			heading: "DIY Slime & Science Party",
			title: "Messy, magical science for all ages.",
			description: "Slime and volcano experiments.",
		},
		{
			heading: "Junior Builders LEGO Party",
			title: "Build, compete, engineer dreams.",
			description: "LEGO builds and competitions.",
		},
		{
			heading: "Magical Birthday Adventure",
			title: "Create unforgettable memories!",
			description: "A fully planned magical birthday adventure with professional entertainers and activities.",
		},
		{
			heading: "Junior Scientists Workshop",
			title: "Create unforgettable memories!",
			description: "An interactive science experience with amazing experiments and discoveries.",
		},
		{
			heading: "Sports Olympiad",
			title: "Create unforgettable memories!",
			description: "A fun-filled day of sports activities and friendly competition.",
		},
		// {
		// 	heading: "Glow-in-the-Dark Party",
		// 	title: "Neon nights, non-stop fun!",
		// 	description: "An exciting party with UV lights, glow paint and neon effects.",
		// },
	];

	return (
		<>
			{events?.map((event, i) => (
				<Card
					key={i}
					className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-card hover-lift "
				// style={{ animationDelay: `${i * 0.1}s` }}
				>
					<div className="relative">
						<Image
							src="/placeholder.svg"
							alt={event?.title}
							width={300}
							height={300}
							className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<CardContent className="p-6 flex flex-col justify-between">
						<div>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">{event?.heading}</h3>
							</div>
							<p className="text-primary font-normal mb-1">{event?.title}</p>
							<p className="text-muted-foreground font-light mb-4 line-clamp-2">{event?.description}</p>
							{/* bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white */}
						</div>
						<Button className="w-full ">
							Book Now
						</Button>
					</CardContent>
				</Card>
			))}
		</>
	)
}

export default EventCard