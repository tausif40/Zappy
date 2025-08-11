"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

function EventFilter({ onSubmitFilters }) {
	const [ selectedCategory, setSelectedCategory ] = useState("all")
	const [ selectedCity, setSelectedCity ] = useState("all")
	const [ priceRange, setPriceRange ] = useState("all")
	const [ selectedDate, setSelectedDate ] = useState("")
	const [ ageValue, setAgeValue ] = useState([ 1, 100 ]);
	const [ isRotating, setIsRotating ] = useState(false)

	const [ open, setOpen ] = useState(false)
	const [ date, setDate ] = useState(undefined)

	const min = 0;
	const max = 100;

	// Convert value to % position
	const getAgePercent = (val) => ((val - min) / (max - min)) * 100;

	// Check if any filters are active (not default)
	const hasActiveFilters = selectedCity !== "all" || priceRange !== "all" || selectedDate !== "";

	// Auto-apply filters when selections change
	useEffect(() => {
		if (onSubmitFilters) {
			const filterData = {
				city: selectedCity === "all" ? "" : selectedCity,
				priceRange: priceRange === "all" ? "" : priceRange,
				date: selectedDate || "",
			};
			onSubmitFilters(filterData);
		}
	}, [ selectedCity, priceRange, selectedDate, onSubmitFilters ]);

	// Submit function to collect all filter data
	const handleSubmitFilters = () => {
		const filterData = {
			city: selectedCity === "all" ? "" : selectedCity,
			priceRange: priceRange === "all" ? "" : priceRange,
			date: selectedDate || "",
		};

		console.log("Filter Data:", filterData);

		if (onSubmitFilters) {
			onSubmitFilters(filterData);
		}
	};

	const handleResetFilters = () => {
		// Add rotation animation
		setIsRotating(true);

		// Reset all filters to default
		setSelectedCategory("all");
		setSelectedCity("all");
		setPriceRange("all");
		setSelectedDate("");

		// Stop rotation after animation completes
		setTimeout(() => {
			setIsRotating(false);
		}, 500);

		// Pass empty filters to parent
		if (onSubmitFilters) {
			onSubmitFilters({
				city: "",
				priceRange: "",
				date: "",
			});
		}
	};

	const cities = [
		{ _id: "all", label: "All Cities" },
		{ _id: 'delhi', label: "Delhi" },
		{ _id: 'indore', label: "Indore" },
		{ _id: 'bangalore', label: "Bangalore" },
		{ _id: 'hyderabad', label: "Hyderabad" },
		{ _id: 'chennai', label: "Chennai" },
		{ _id: 'kolkata', label: "Kolkata" },
		{ _id: 'pune', label: "Pune" },
		{ _id: 'ahmedabad', label: "Ahmedabad" },
		{ _id: 'lucknow', label: "Lucknow" }
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
				<div className="flex justify-between gap-3">
					<h3 className="text-lg font-semibold mb-4">Filters</h3>
					<Button
						size='sm'
						variant="ghost"
						onClick={handleResetFilters}
						className="relative flex"
					>
						<RotateCw
							className={`transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`}
						/>
						{/* Red dot indicator when filters are active */}
						{hasActiveFilters && (
							<div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
						)}
					</Button>
				</div>

				<div className="space-y-6">

					<div>
						<label className="block text-sm font-medium mb-2">Select Date</label>
						<Input
							type='date'
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
						/>
					</div>

					{/* <div>
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
					</div> */}

					<div>
						<label className="block text-sm font-medium mb-2">City</label>
						<Select value={selectedCity} onValueChange={setSelectedCity}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city) => (
									<SelectItem key={city._id} value={city._id}>
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

					{/* <div>
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
					</div> */}

					{/* Action Buttons */}
					<div className="w-full">
						<Button
							onClick={handleSubmitFilters}
							className="bg-purple-600 hover:bg-purple-600 w-full"
						>
							Apply Filters
						</Button>
					</div>
				</div>
			</Card>
		</>
	)
}

export default EventFilter