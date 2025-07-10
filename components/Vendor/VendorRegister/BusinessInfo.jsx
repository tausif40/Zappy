import React, { useState } from 'react'
import { MapPin, Building, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button'

function BusinessInfo({ currentStep }) {

	const [ formData, setFormData ] = useState({
		businessName: "",
		businessType: "",
		experience: "",
		city: "",
		state: "",
		Zip: "",
		address: "",
		description: "",
	})

	const businessTypes = [
		"Event Planning Company",
		"Entertainment Service",
		"Photography/Videography",
		"Catering Service",
		"Decoration Service",
		"Equipment Rental",
		"Individual Performer",
		"Other",
	]

	const cities = [
		"Mumbai",
		"Delhi",
		"Bangalore",
		"Pune",
		"Hyderabad",
		"Chennai",
		"Kolkata",
		"Ahmedabad",
		"Jaipur",
		"Lucknow",
		"Kanpur",
		"Nagpur",
	]

	const stateList = [
		"Mumbai",
		"Delhi",
		"Bangalore",
		"Pune",
		"Hyderabad",
		"Chennai",
		"Kolkata",
		"Ahmedabad",
		"Jaipur",
		"Lucknow",
		"Kanpur",
		"Nagpur",
	]

	return (
		<>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Business Information</h3>

				<div className="space-y-2">
					<label className="text-sm font-medium">Business Name <span className="text-red-500">*</span></label>
					<div className="relative">
						<Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Business Name"
							value={formData.businessName}
							onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
							className="pl-10 border-2 focus:border-purple-500"
							required
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Business Type <span className="text-red-500">*</span></label>
						<Select
							value={formData.businessType}
							onValueChange={(value) => setFormData({ ...formData, businessType: value })}
						>
							<SelectTrigger className="border-2 focus:border-purple-500 text-muted-foreground">
								<SelectValue placeholder="Select business type" />
							</SelectTrigger>
							<SelectContent>
								{businessTypes.map((type) => (
									<SelectItem key={type} value={type}>
										{type}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Experience (Year) <span className="text-red-500">*</span></label>
						<Input
							placeholder="Years of experience"
							value={formData.experience}
							onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
							className="border-2 focus:border-purple-500"
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">State <span className="text-red-500">*</span></label>
					<Select
						value={formData.state}
						onValueChange={(value) => setFormData({ ...formData, state: value })}
					>
						<SelectTrigger className="border-2 focus:border-purple-500 text-muted-foreground">
							<SelectValue placeholder="Select State" />
						</SelectTrigger>
						<SelectContent>
							{stateList.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">City <span className="text-red-500">*</span></label>
						<div className="relative">
							<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Select
								value={formData.city}
								onValueChange={(value) => setFormData({ ...formData, city: value })}
							>
								<SelectTrigger className="pl-10 border-2 focus:border-purple-500 text-muted-foreground">
									<SelectValue placeholder="Select your city" />
								</SelectTrigger>
								<SelectContent>
									{cities.map((city) => (
										<SelectItem key={city} value={city}>
											{city}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Zip <span className="text-red-500">*</span></label>
						<Input
							placeholder="Zip code"
							value={formData.Zip}
							onChange={(e) => setFormData({ ...formData, Zip: e.target.value })}
							className="border-2 focus:border-purple-500"
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Business Address</label>
					<Textarea
						placeholder="Enter your business address"
						value={formData.address}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
						className="border-2 focus:border-purple-500"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Business Description <span className="text-red-500">*</span></label>
					<Textarea
						placeholder="Describe your business and what makes you special..."
						value={formData.description}
						onChange={(e) => setFormData({ ...formData, description: e.target.value })}
						className="border-2 focus:border-purple-500 min-h-[100px]"
						required
					/>
				</div>
				<div className="flex justify-between pt-6">
					<Button type="button" variant="outline" onClick={() => currentStep((prev) => prev - 1)}>
						Previous
					</Button>

					<Button
						variant='highlight'
						type="button"
						onClick={() => currentStep((prev) => prev + 1)}
						className="ml-auto text-white"
					>
						Next
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
		</>
	)
}

export default BusinessInfo