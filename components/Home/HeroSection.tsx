import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Calendar, Star, CheckCircle, ArrowRight, Play, StarIcon, Box, Stars, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function HeroSection() {
	return (
		<>
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-yellow-900/20">
					<div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full animate-float opacity-60"></div>
					<div className="absolute top-40 right-10 w-16 h-16 bg-pink-200 rounded-full animate-bounce-slow opacity-60"></div>
					<div className="absolute bottom-10 left-16 w-24 h-24 bg-yellow-200 rounded-full opacity-60"></div>
					<div className="absolute bottom-40 right-10 w-12 h-12 bg-green-200 rounded-full animate-float opacity-60"></div>
				</div>

				<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="grid lg:grid-cols-2 backdrop:gap-12 items-end">
						{/* Left Content */}
						<div className={`space-y-8 mt-6`}>
							<div className="space-y-4">
								<Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1 text-sm font-light animate-pulse-slow">
									✨ Trusted by 10,000+ families across India
								</Badge>

								{/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
											<span
												key={currentTitleIndex}
												className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent animate-slide-up"
											>
												{animatedTitles[currentTitleIndex]}
											</span>
											<br />
											<span className="text-foreground">for Your Kids</span>
										</h1> */}
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
									<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
										Magical
									</span>
									<br />
									<span className="bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent animate-slide-up">
										Events For
									</span>
									<br />
									<span className=" bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent animate-slide-up">Special Moments</span>
								</h1>
								{/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold space-y-2">
									<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
										Magical
									</span>
									<p className="bg-gradient-to-r from-pink-600 via-yellow-600 to-yellow-600 bg-clip-text text-transparent animate-slide-up">Kids Events</p>
									<p className="dark:text-foreground text-gray-800">For Special Moments</p>
								</h1> */}

								<p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
									Create unforgettable memories for your children
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link href="/kids-events">
									<Button
										size="lg"
										className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl transition-all duration-300 px-6 py-4 text-lg"
									>
										<StarIcon className="mr-1 h-5 w-5" />
										Explore Events
										{/* <ArrowRight className="ml-2 h-5 w-5" /> */}
									</Button>
								</Link>
								<Link href="/kids-events">
									<Button
										size="lg"
										variant="outline"
										className="border-2 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-6 py-4 text-lg"
									>
										<ShoppingBag className="mr-2 h-5 w-5" />
										Shop Product
									</Button>
								</Link>
							</div>

							{/* Trust Indicators */}
							{/* <div className="flex items-center space-x-6 pt-4">
								<div className="flex items-center">
									<div className="flex -space-x-2">
										{[1, 2, 3, 4].map((i) => (
											<Avatar key={i} className="border-2 border-white w-8 h-8">
												<AvatarImage src={`/placeholder.svg?height=32&width=32`} />
												<AvatarFallback>U{i}</AvatarFallback>
											</Avatar>
										))}
									</div>
									<span className="ml-3 text-sm text-muted-foreground">2,500+ happy customers</span>
								</div>
								<div className="flex items-center">
									<Star className="h-5 w-5 text-yellow-400 fill-current" />
									<span className="ml-1 font-semibold">4.9/5</span>
								</div>
							</div> */}

							<div className='border rounded-md p-4 bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-pink-800/20 dark:to-purple-900/10'>
								<p className='flex items-center text-primary font-semibold text-lg mb-2'><Box size={18} />&nbsp;Products <span className='font-normal px-2'>+</span> <Star size={18} />&nbsp;Services</p>
								<p className='text-sm'><span className='font-bold'>Save 15%</span> when you combine our premium party products with professional event services!</p>
							</div>
						</div>

						{/* Right Content - Hero Image */}
						<div className={`relative flex flex-col items-center lg:items-end pt-24 lg:pt-0`}>
							<div className="relative">

								<Image
									src="/placeholder.svg"
									alt="Kids enjoying themed party"
									width={500}
									height={500}
									className="rounded-3xl shadow-2xl hover-lift"
								/>

								{/* Floating Cards */}
								{/* <Card className="absolute -top-6 -left-6 bg-background/90 backdrop-blur-sm shadow-xl">
									<CardContent className="p-4">
										<div className="flex items-center space-x-3">
											<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
												<CheckCircle className="w-6 h-6 text-white" />
											</div>
											<div>
												<p className="font-semibold text-sm text-foreground">Verified Vendor</p>
												<p className="text-xs text-muted-foreground">100% Trusted</p>
											</div>
										</div>
									</CardContent>
								</Card> */}

								<Card className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm shadow-xl">
									<CardContent className="p-4">
										<div className="flex items-center space-x-3">
											<div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
												<Calendar className="w-6 h-6 text-white" />
											</div>
											<div>
												<p className="font-semibold text-sm">Next Available</p>
												<p className="text-xs text-muted-foreground">This Weekend</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Slide Indicators */}
							{/* <div className="flex justify-center mt-6 space-x-2">
										{heroSlides.map((_, index) => (
											<button
												key={index}
												onClick={() => setCurrentSlide(index)}
												className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-purple-600 w-8" : "bg-purple-200 hover:bg-purple-300"
													}`}
											/>
										))}
									</div> */}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default HeroSection