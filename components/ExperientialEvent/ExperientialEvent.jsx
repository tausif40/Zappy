"use client"

import { useState } from "react"
import { Search, SlidersHorizontal,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import EventFilter from "@/components/BirthdayEvents/EventFilter"
import EventCard from "./EventCard"

export default function ExperientialEvent() {
	const [ searchQuery, setSearchQuery ] = useState("")

	return (
		<div className="min-h-screen py-16 bg-background">
			{/* Header */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Curated Events
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							Discover amazing themed parties and events designed to create magical memories for your children
						</p>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search for themes, vendors, or locations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-6 text-lg border-2 focus:border-purple-500 rounded-full"
							/>
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


						{/* Events Grid */}
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
							<EventCard />
						</div>

						{/* Load More */}
						<div className="text-center mt-6 col-span-3">
							<Button variant="secondary" size="lg" className="px-8">
								Load More Events
							</Button>
						</div>
					</div>
				</div>
			</div>


		</div>
	)
}