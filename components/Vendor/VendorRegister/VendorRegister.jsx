"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Store} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import PersonalInfo from './PersonalInfo'
import BusinessInfo from './BusinessInfo'
import Services from './Services'

export default function VendorRegister() {
	const route = useRouter();

	const [ currentStep, setCurrentStep ] = useState(1)
	const [ formData, setFormData ] = useState({
		// Personal Info
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",

		// Business Info
		businessName: "",
		businessType: "",
		experience: "",
		city: "",
		state: "",
		Zip: "",
		address: "",
		description: "",

		// Services
		services: [],
		// priceRange: "",

		// Agreement
		agreeToTerms: false,
		agreeToBackground: false,
	})
	const { toast } = useToast()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			toast({
				title: "Password Mismatch",
				description: "Passwords do not match. Please try again.",
				variant: "destructive",
			})
			return
		}

		// Set vendor auth cookie (in real app, this would be done by backend)
		document.cookie = "vendor-auth-token=vendor-token-123; path=/; max-age=86400"

		toast({
			title: "Registration Successful!",
			description: "Welcome to Zappy Vendor! Redirecting to your dashboard...",
		})

		// Redirect to vendor dashboard after a short delay
		setTimeout(() => {
			// window.location.href = "/vendor/dashboard"
			route.push('/vendor/dashboard')
		}, 2000)
	}

	const nextStep = () => {
		if (currentStep < 3) setCurrentStep(currentStep + 1)
	}

	const prevStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1)
	}



	return (
		<div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-yellow-900/10 flex items-center justify-center p-4">
			<div className="w-full max-w-4xl">
				<Card className="border-0 shadow-2xl animate-slide-up">
					<CardHeader className="text-center pb-6">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
								<Store className="w-8 h-8 text-white" />
							</div>
						</div>
						<CardTitle className="text-2xl font-bold">Become a Vendor</CardTitle>
						<p className="text-muted-foreground">Join our platform and grow your event business</p>

						{/* Progress Indicator */}
						<div className="flex items-center justify-center space-x-4 mt-6">
							{[ 1, 2, 3 ].map((step) => (
								<div key={step} className="flex items-center">
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
											? "bg-pink-600 text-white"
											: "bg-gray-200 text-gray-500"
											}`}
									>
										{step}
									</div>
									{step < 3 && (
										<div
											className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-pink-600" : "bg-gray-200"
												}`}
										/>
									)}
								</div>
							))}
						</div>
						<div className="flex justify-center space-x-8 mt-2 text-xs text-muted-foreground">
							<span>Personal Info</span>
							<span>Business Details</span>
							<span>Services & Review</span>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Step 1: Personal Information */}
							{currentStep === 1 && (
								<PersonalInfo />
							)}

							{/* Step 2: Business Information */}
							{currentStep === 2 && (
								<BusinessInfo />
							)}

							{/* Step 3: Services & Review */}
							{currentStep === 3 && (
								<Services />
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between pt-6">
								{currentStep > 1 && (
									<Button type="button" variant="outline" onClick={prevStep}>
										Previous
									</Button>
								)}

								{currentStep < 3 ? (
									<Button
										variant='highlight'
										type="button"
										onClick={nextStep}
										className="ml-auto text-white"
									>
										Next
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								) : (
									<Button
										variant='highlight'
										type="submit"
										className="ml-auto text-white"
										disabled={!formData.agreeToTerms || !formData.agreeToBackground}
									>
										Create Vendor Account
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								)}
							</div>
						</form>

						{/* {currentStep === 1 && (
							<>
								<div className="relative">
									<Separator />
									<span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
										Or register with
									</span>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Button variant="outline" className="border-2">
										<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											/>
											<path
												fill="currentColor"
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											/>
											<path
												fill="currentColor"
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											/>
											<path
												fill="currentColor"
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											/>
										</svg>
										Google
									</Button>
									<Button variant="outline" className="border-2">
										<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
										</svg>
										Facebook
									</Button>
								</div>
							</>
						)} */}
						<Separator />
						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Already have a vendor account?{" "}
								<Link href="/auth/login" className="text-purple-600 hover:underline font-medium">
									Sign in here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
