import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Star } from 'lucide-react'

function Reviews() {

	const reviews = [
		{
			name: "Priya Sharma",
			rating: 5,
			date: "2 weeks ago",
			comment:
				"Absolutely magical experience! My daughter felt like a real princess. The performer was amazing and kept all the kids engaged throughout. Highly recommend!",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 12,
		},
		{
			name: "Rajesh Kumar",
			rating: 5,
			date: "1 month ago",
			comment:
				"Perfect organization and attention to detail. The decoration was stunning and the activities were age-appropriate. Worth every penny!",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 8,
		},
		{
			name: "Anita Patel",
			rating: 4,
			date: "3 weeks ago",
			comment:
				"Great experience overall. The kids loved the princess performer and the activities. Only minor issue was the setup took a bit longer than expected.",
			avatar: "/placeholder.svg?height=40&width=40",
			helpful: 5,
		},
	]

	return (
		<>
			<Card className="border shadow mt-8">
				<CardContent className="p-8">
					<h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
					<div className="space-y-6">
						{reviews.map((review, index) => (
							<div key={index}>
								<div className="flex items-start space-x-4">
									<Avatar>
										<AvatarImage src={review.avatar || "/placeholder.svg"} />
										<AvatarFallback className='text-red-600'>
											{review.name.split(" ").map((n) => n[ 0 ]).join("")}
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
			</Card>
		</>
	)
}

export default Reviews