import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star } from 'lucide-react'
import Image from 'next/image'

function Reviews() {
	const reviews = [
		{
			name: "Priya Sharma",
			rating: 5,
			date: "2 weeks ago",
			comment:
				"Absolutely magical experience! My daughter felt like a real princess. The performer was amazing and kept all the kids engaged throughout. Highly recommend!",
			avatar: "/placeholder.svg",
			helpful: 12,
			images: [ "/placeholder.svg", "/placeholder.svg" ]
		},
		{
			name: "Rajesh Kumar",
			rating: 5,
			date: "1 month ago",
			comment:
				"Perfect organization and attention to detail. The decoration was stunning and the activities were age-appropriate. Worth every penny!",
			avatar: "/placeholder.svg",
			helpful: 8,
			images: [ "/placeholder.svg", "/placeholder.svg", "/placeholder.svg" ]
		},
		{
			name: "Anita Patel",
			rating: 4,
			date: "3 weeks ago",
			comment:
				"Great experience overall. The kids loved the princess performer and the activities. Only minor issue was the setup took a bit longer than expected.",
			avatar: "/placeholder.svg",
			helpful: 5,
			images: [ "/placeholder.svg", "/placeholder.svg", "/placeholder.svg" ]
		},
	]

	const allImages = [
		{ id: 1, src: "/placeholder.svg", alt: 'Image 1' },
		{ id: 2, src: "/placeholder.svg", alt: 'Image 2' },
		{ id: 3, src: "/placeholder.svg", alt: 'Image 3' },
		{ id: 4, src: "/placeholder.svg", alt: 'Image 4' },
		{ id: 5, src: "/placeholder.svg", alt: 'Image 5' },
		{ id: 6, src: "/placeholder.svg", alt: 'Image 6' },
		{ id: 7, src: "/placeholder.svg", alt: 'Image 7' },
		{ id: 8, src: "/placeholder.svg", alt: 'Image 8' },
		{ id: 9, src: "/placeholder.svg", alt: 'Image 9' },
		{ id: 10, src: "/placeholder.svg", alt: 'Image 10' },
		{ id: 11, src: "/placeholder.svg", alt: 'Image 11' },
		{ id: 12, src: "/placeholder.svg", alt: 'Image 12' },
		{ id: 13, src: "/placeholder.svg", alt: 'Image 13' },
		{ id: 14, src: "/placeholder.svg", alt: 'Image 14' },
		{ id: 15, src: "/placeholder.svg", alt: 'Image 15' },
	];

	const visibleImages = allImages.slice(0, 8);
	const remainingCount = allImages.length - visibleImages.length;

	return (
		<Card className="border shadow mt-8">
			<CardContent className="p-8">
				<h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

				{/* Top section showing all review images */}
				<div className="flex items-center space-x-2 overflow-x-auto p-2 mb-6 ">
					{visibleImages.map((img, index) => (
						<div key={img.id} className="relative">
							<img
								src={img.src}
								alt={img.alt}
								className="w-20 h-20 object-cover rounded"
							/>
							{index === visibleImages.length - 1 && remainingCount > 0 && (
								<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
									<span className="text-white text-sm font-medium">
										+{remainingCount} more
									</span>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Review list */}
				<div className="space-y-6">
					{reviews.map((review, index) => (
						<div key={index}>
							<div className="flex items-start space-x-4">
								<Avatar>
									<AvatarImage src={review.avatar || "/placeholder.svg"} />
									<AvatarFallback className='text-red-600'>
										{review.name.split(" ").map(n => n[ 0 ]).join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-2">
										<h4 className="font-semibold">{review.name}</h4>
										<span className="text-sm text-muted-foreground">{review.date}</span>
									</div>
									<div className="flex items-center mb-2">
										{[ ...Array(review.rating) ].map((_, i) => (
											<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
										))}
									</div>
									<p className="text-muted-foreground mb-3">{review.comment}</p>

									{/* Individual review images */}
									{review.images && review.images.length > 0 && (
										<div className="flex flex-wrap gap-3 mb-3">
											{review.images.map((img, i) => (
												<div key={i} className="relative w-24 h-20 rounded overflow-hidden">
													<Image src={img} alt={`Image by ${review.name}`} fill className="object-cover" />
												</div>
											))}
										</div>
									)}

									<div className="flex items-center space-x-4 text-sm text-muted-foreground">
										<button className="hover:text-foreground">Helpful ({review.helpful})</button>
										<button className="hover:text-foreground">Reply</button>
									</div>
								</div>
							</div>
							{index < reviews.length - 1 && <Separator className="mt-6" />}
						</div>
					))}
				</div>

				<div className="mt-6">
					<Button variant="outline" className="w-full">
						View All Reviews
					</Button>
				</div>
			</CardContent>
		</Card >
	)
}

export default Reviews
