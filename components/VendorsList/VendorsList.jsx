"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VendorCard from './VendorCard'
import Link from "next/link"

export default function VendorsList() {
	const [ searchQuery, setSearchQuery ] = useState("")

	const cities = [ "All Cities", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad" ]

	const specializations = [
		"All Specializations",
		"Princess & Fairy Tale",
		"Superhero & Action",
		"Animal & Nature",
		"Fantasy & Magical",
		"Space & Science",
		"Winter & Frozen",
		"Sports & Adventure",
	]

	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Trusted Vendors
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Connect with verified event specialists who create magical experiences for children
						</p>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search vendors by name, location, or specialization..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-6 text-lg border-2 focus:border-purple-500 rounded-full"
							/>
						</div>
					</div>
				</div>
			</section >

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Filters */}
				<div className="flex flex-col md:flex-row gap-4 mb-8">
					<Select defaultValue="all-cities">
						<SelectTrigger className="w-full md:w-48">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{cities.map((city) => (
								<SelectItem key={city} value={city.toLowerCase().replace(/\s+/g, "-")}>
									{city}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* <Select defaultValue="all-specializations">
						<SelectTrigger className="w-full md:w-64">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{specializations.map((spec) => (
								<SelectItem key={spec} value={spec.toLowerCase().replace(/\s+/g, "-")}>
									{spec}
								</SelectItem>
							))}
						</SelectContent>
					</Select> */}

					<Select defaultValue="rating">
						<SelectTrigger className="w-full md:w-48">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="rating">Highest Rated</SelectItem>
							<SelectItem value="experience">Most Experienced</SelectItem>
							<SelectItem value="reviews">Most Reviews</SelectItem>
							<SelectItem value="response">Fastest Response</SelectItem>
							<SelectItem value="price-low">Price: Low to High</SelectItem>
							<SelectItem value="price-high">Price: High to Low</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Vendors Grid */}
				<div className="grid lg:grid-cols-2 gap-8">
					<VendorCard />
				</div>

				{/* Load More */}
				<div className="text-center mt-12">
					<Button variant="outline" size="lg" className="px-8">
						Load More Vendors
					</Button>
				</div>

				{/* Become a Vendor CTA */}
				<Card className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-600/30 dark:to-pink-600/30 text-white border-0">
					<CardContent className="p-8 text-center">
						<h3 className="text-2xl font-bold mb-4">Join Our Vendor Network</h3>
						<p className="text-purple-100 mb-6 max-w-2xl mx-auto">
							Are you an event planner or entertainer? Join our platform and connect with peoples looking for amazing
							events.
						</p>
						<Link href='/vendor/register'>
							<Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
								Become a Vendor
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div >
	)
}