import React, { useState } from 'react'
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { servicesSchema } from '@/schema/vendorSchema'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


function Services({ currentStep }) {

	const {
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(servicesSchema),
		defaultValues: {
			services: [],
			agreeToTerms: false,
			agreeToBackground: false,
		},
	});

	const services = watch("services");
	const agreeToTerms = watch("agreeToTerms");
	const agreeToBackground = watch("agreeToBackground");


	const serviceOptions = [
		"Birthday Parties",
		"Themed Events",
		"Entertainment",
		"Photography",
		"Videography",
		"Decoration",
		"Catering",
		"Face Painting",
		"Magic Shows",
		"Balloon Art",
		"Games & Activities",
		"Character Performances",
	]

	const toggleService = (service) => {
		const current = watch("services");
		const updated = current.includes(service)
			? current.filter((s) => s !== service)
			: [ ...current, service ];
		setValue("services", updated, { shouldValidate: true });
	};

	const onSubmit = (data) => {
		console.log("Form Submitted:", data);
	};

	return (
		<>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<h3 className="text-lg font-semibold">Services & Final Review</h3>

				{/* Services */}
				<div className='space-y-2'>
					<label className="text-sm font-medium">
						Services Offered <span className="text-red-500">*</span>
					</label>
					<div className="grid grid-cols-3 gap-2">
						{serviceOptions.map((service) => (
							<div key={service} className="flex items-center space-x-2">
								<Checkbox
									id={service}
									checked={services?.includes(service)}
									onCheckedChange={() => toggleService(service)}
								/>
								<label htmlFor={service} className="text-sm">
									{service}
								</label>
							</div>
						))}
					</div>
					{errors.services && <p className="text-sm text-red-500">{errors.services.message}</p>}
				</div>

				{/* Terms */}
				<div className="pt-4">
					<div className="">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								checked={agreeToTerms}
								onCheckedChange={(checked) =>
									setValue("agreeToTerms", !!checked, { shouldValidate: true })
								}
							/>
							<label htmlFor="terms" className="text-sm">
								I agree to the{" "}
								<Link href="/vendor/terms" className="text-purple-600 hover:underline">
									Vendor Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="/vendor/privacy"
									className="text-purple-600 hover:underline"
								>
									Privacy Policy
								</Link>
							</label>
						</div>
						{errors.agreeToTerms && <p className="text-sm text-red-500 mt-1">{errors.agreeToTerms.message}</p>}
					</div>

					<div className="flex items-center space-x-2 pt-4">
						<Checkbox
							id="background"
							checked={agreeToBackground}
							onCheckedChange={(checked) =>
								setValue("agreeToBackground", !!checked, { shouldValidate: true })
							}
						/>
						<label htmlFor="background" className="text-sm">
							I consent to background verification and quality checks
						</label>
					</div>
					{errors.agreeToBackground && <p className="text-sm text-red-500 mt-1">{errors.agreeToBackground.message}</p>}
				</div>

				{/* Buttons */}
				<div className="flex justify-between pt-6">
					<Button type="button" variant="outline" onClick={() => currentStep((prev) => prev - 1)}>
						Previous
					</Button>

					<Button type="submit" variant="highlight" className="ml-auto text-white">
						Next
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</form >

		</>
	)
}

export default Services