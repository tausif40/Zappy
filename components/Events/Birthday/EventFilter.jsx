"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"

function EventFilter() {
	const [ selectedCategory, setSelectedCategory ] = useState("all")
	const [ selectedCity, setSelectedCity ] = useState("all")
	const [ priceRange, setPriceRange ] = useState("all")
	const [ ageValue, setAgeValue ] = useState([ 1, 100 ]);


	const min = 0;
	const max = 100;

	// Convert value to % position
	const getAgePercent = (val) => ((val - min) / (max - min)) * 100;
	console.log(getAgePercent(ageValue[ 1 ]));

	const categories = [
		{ value: "all", label: "All Categories" },
		{ value: "birthday", label: "Birthday Parties" },
		{ value: "themed", label: "Themed Events" },
		{ value: "educational", label: "Educational" },
		{ value: "outdoor", label: "Outdoor Adventures" },
	]

	const cities = [
		{ value: "all", label: "All Cities" },
		{ value: "mumbai", label: "Mumbai" },
		{ value: "delhi", label: "Delhi" },
		{ value: "bangalore", label: "Bangalore" },
		{ value: "pune", label: "Pune" },
		{ value: "hyderabad", label: "Hyderabad" },
		{ value: "chennai", label: "Chennai" },
	]

	const priceRanges = [
		{ value: "all", label: "All Prices" },
		{ value: "under-5000", label: "Under ₹5,000" },
		{ value: "5000-10000", label: "₹5,000 - ₹10,000" },
		{ value: "10000-15000", label: "₹10,000 - ₹15,000" },
		{ value: "above-15000", label: "Above ₹15,000" },
	]

	return (
		<>
			<Card className="p-4">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>

				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-2">Category</label>
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category.value} value={category.value}>
										{category.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">City</label>
						<Select value={selectedCity} onValueChange={setSelectedCity}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city) => (
									<SelectItem key={city.value} value={city.value}>
										{city.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Price Range</label>
						<Select value={priceRange} onValueChange={setPriceRange}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{priceRanges.map((range) => (
									<SelectItem key={range.value} value={range.value}>
										{range.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-3">Age Group</label>
						<div className="space-y-2">
							<Slider defaultValue={ageValue}
								value={ageValue}
								min={min}
								max={max}
								step={1}
								onValueChange={setAgeValue} />
							<div className="relative h-6">
								<span
									className="absolute text-sm text-muted-foreground top-1"
									// style={{ left: `calc(${getAgePercent(ageValue[ 0 ])}% - 10px)` }}
									style={{
										left: getAgePercent(ageValue[ 0 ]) >= 80
											? `calc(${getAgePercent(ageValue[ 0 ])}% - 22px)`
											: `calc(${getAgePercent(ageValue[ 0 ])}% - 10px)`
									}}
								>
									{ageValue[ 0 ]}
								</span>
								<span
									className="absolute text-sm text-muted-foreground top-1"
									style={{
										left: getAgePercent(ageValue[ 1 ]) <= 20
											? `calc(${getAgePercent(ageValue[ 1 ])}% + 10px)`
											: `calc(${getAgePercent(ageValue[ 1 ])}% - 10px)`
									}}
								>
									{ageValue[ 1 ]}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</>
	)
}

export default EventFilter