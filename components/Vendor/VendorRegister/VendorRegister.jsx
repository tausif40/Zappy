"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { Store } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import PersonalInfo from './PersonalInfo'
import BusinessInfo from './BusinessInfo'
import Services from './Services'

export default function VendorRegister() {
	const [ currentStep, setCurrentStep ] = useState(1)

	useEffect(() => {
		window.scrollTo({ top: 40, behavior: "instant" });
	}, [ currentStep ])

	return (
		<div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-yellow-900/10 flex items-center justify-center p-4">
			<div className="w-full max-w-4xl">
				<Card className="border-0 shadow-md animate-slide-up">
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
									<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
									${step <= currentStep ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-500"}`}>
										{step}
									</div>
									{step < 3 && (<div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-pink-600" : "bg-gray-200"}`} />)}
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
						<div className="space-y-6">
							{currentStep === 1 && (<PersonalInfo currentStep={setCurrentStep} />)}
							{currentStep === 2 && (<BusinessInfo currentStep={setCurrentStep} />)}
							{currentStep === 3 && (<Services currentStep={setCurrentStep} />)}
						</div>

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
