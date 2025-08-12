"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"
import { Slider } from "../ui/slider"

function EventFilter({ onSubmitFilters }) {
	const [ selectedCategory, setSelectedCategory ] = useState("all")
	const [ selectedCity, setSelectedCity ] = useState("all")
	const [ priceRange, setPriceRange ] = useState("all")
	const [ selectedDate, setSelectedDate ] = useState("")
	// Discrete price steps: 5K, 10K, 15K, 20K, 30K, 50K, 75K, 1L, 1.5L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L, 10L+
	const PRICE_STEPS = [
		1,
		5_000,
		10_000,
		15_000,
		20_000,
		30_000,
		50_000,
		75_000,
		100_000,
		150_000,
		200_000,
		300_000,
		400_000,
		500_000,
		600_000,
		700_000,
		800_000,
		900_000,
		1_000_000 // 10L (we display as 10L+)
	];
	const MIN_INDEX = 1;
	const MAX_INDEX = PRICE_STEPS.length - 1;
	const [ priceIndexRange, setPriceIndexRange ] = useState([ MIN_INDEX, MAX_INDEX ]);
	const [ isRotating, setIsRotating ] = useState(false)

	const [ open, setOpen ] = useState(false)
	const [ date, setDate ] = useState(undefined)

	// Slider operates on index steps mapped to PRICE_STEPS
	const min = MIN_INDEX;
	const max = MAX_INDEX;

	const formatPriceLabelFromIndex = (index) => {
		if (index === MAX_INDEX) return "10L+";
		const value = PRICE_STEPS[ index ];
		if (value >= 100000) {
			const lakhs = value / 100000;
			// Show integer or decimal (e.g., 1L, 1.5L)
			return Number.isInteger(lakhs) ? `${lakhs}L` : `${lakhs}L`;
		}
		return `${Math.round(value / 1000)}K`;
	};

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
		const priceMin = PRICE_STEPS[ priceIndexRange[ 0 ] ];
		const priceMax = PRICE_STEPS[ priceIndexRange[ 1 ] ];

		const filterData = {
			city: selectedCity === "all" ? "" : selectedCity,
			date: selectedDate || "",
			// Backward compatible string if needed
			priceRange: priceRange === "all" ? "" : priceRange,
			// Numeric price range from slider, as requested
			// priceMin,
			// priceMax,
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
		setPriceIndexRange([ MIN_INDEX, MAX_INDEX ]);

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
		{ value: "under-5000", label: "Under 5,000" },
		{ value: "5000-10000", label: "5,000 - 10,000" },
		{ value: "10000-15000", label: "10,000 - 15,000" },
		{ value: "above-15000", label: "Above 15,000" },
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
						<label className="block text-sm font-medium mb-2">Price Range slider</label>
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
						<label className="block text-sm font-medium mb-3">Price Range</label>
						<div className="space-y-2">
							<Slider
								value={priceIndexRange}
								min={min}
								max={max}
								step={1}
								onValueChange={setPriceIndexRange}
							/>
							<div className="flex justify-between h-6">
								<span className="text-sm text-muted-foreground">
									{formatPriceLabelFromIndex(priceIndexRange[ 0 ])}
								</span>
								<span className="text-sm text-muted-foreground">
									{formatPriceLabelFromIndex(priceIndexRange[ 1 ])}
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