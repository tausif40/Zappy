import React, { useState } from 'react'
import { MapPin, Building, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { businessSchema } from '@/schema/vendorSchema'

function BusinessInfo({ currentStep }) {

	const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
		resolver: zodResolver(businessSchema),
		mode: "onChange",
	});
	console.log(errors);

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

	const onSubmit = async (data) => {
		const { ...payload } = data
		console.log("Submit: ", payload)
		// try {
		// 	setIsLoading(true)
		// 	const res = await dispatch(registerVendor(payload)).unwrap();
		// 	console.log(res);
		// 	if (res?.statusCode === 400) {
		// 		toast({ variant: "warning", title: "Please verify!", description: "Welcome to Zappy. Please verify your account." });
		// 	}
		// 	if (res.status === 201) {
		// 		currentStep((prev) => prev + 1)
		// 		setOtpVerifyPopup(true)
		// 	} else {
		// 		throw new Error(res.data.message || "Login failed. Please try again.");
		// 	}
		// } catch (error) {
		// 	console.log("Error in registration: ", error)
		// 	toast({ variant: "destructive", title: "Registration failed!", description: error?.message || "Something went wrong. Please try again." })
		// } finally {
		// 	setIsLoading(false)
		// }
	}

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

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<h3 className="text-lg font-semibold">Business Information</h3>

				<div className="space-y-1">
					<label className="text-sm font-medium">Business Name <span className="text-red-500">*</span></label>
					<div className="relative">
						<Building className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							{...register("businessName")}
							placeholder="Business Name"
							className="pl-10 border-2 focus:border-purple-500"
						/>
						{errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="">
						<label className="text-sm font-medium mb-1">Business Type <span className="text-red-500">*</span></label>
						<Select onValueChange={(value) => setValue("businessType", value, { shouldValidate: true })}>
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
						{errors.businessType && <p className="text-sm text-red-500">{errors.businessType.message}</p>}
					</div>

					<div className="">
						<label className="text-sm font-medium mb-1">Experience (Year) <span className="text-red-500">*</span></label>
						<Input
							{...register("experience")}
							type='number'
							placeholder="Years of experience"
							className="border-2 focus:border-purple-500"
						/>
						{errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
					</div>
				</div>

				<div>
					<label className="text-sm font-medium mb-1">State <span className="text-red-500">*</span></label>
					<Select onValueChange={(value) => setValue("state", value, { shouldValidate: true })}>
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
					{errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="">
						<label className="text-sm font-medium mb-1">City <span className="text-red-500">*</span></label>
						<div className="relative">
							<MapPin className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Select onValueChange={(value) => setValue("city", value, { shouldValidate: true })}>
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
							{errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
						</div>
					</div>

					<div>
						<label className="text-sm font-medium mb-1">Zip <span className="text-red-500">*</span></label>
						<Input
							{...register("zip")}
							placeholder="Zip code"
							className="border-2 focus:border-purple-500"
						/>
						{errors.zip && <p className="text-sm text-red-500">{errors.zip.message}</p>}
					</div>
				</div>

				<div >
					<label className="text-sm font-medium mb-1">Business Address</label>
					<Textarea
						{...register("address")}
						placeholder="Enter your business address"
						className="border-2 focus:border-purple-500 "
					/>
					{errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
				</div>

				<div >
					<label className="text-sm font-medium mb-1">Business Description <span className="text-red-500">*</span></label>
					<Textarea
						{...register("description")}
						placeholder="Describe your business and what makes you special..."
						className="border-2 focus:border-purple-500 min-h-[100px]"
					/>
					{errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
				</div>

				<div className="flex justify-between pt-6">
					<Button type="button" variant="outline" onClick={() => currentStep((prev) => prev - 1)}>
						Previous
					</Button>

					<Button
						type="submit"
						variant='highlight'
						className="ml-auto text-white"
					>
						Next
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</form >
		</>
	)
}

export default BusinessInfo