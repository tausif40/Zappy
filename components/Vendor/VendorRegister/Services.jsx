import React, { useState } from 'react'
import Link from "next/link"

import { Checkbox } from "@/components/ui/checkbox"

function Services() {

	const [ formData, setFormData ] = useState({
		services: [],
		agreeToTerms: false,
		agreeToBackground: false,
	})

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
		setFormData((prev) => ({
			...prev, services: prev.services.includes(service) ? prev.services.filter((s) => s !== service) : [ ...prev.services, service ],
		}))
	}

	return (
		<>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Services & Final Review</h3>

				<div className="space-y-2">
					<label className="text-sm font-medium">Services Offered <span className="text-red-500">*</span></label>
					<div className="grid grid-cols-3 gap-2">
						{serviceOptions.map((service) => (
							<div key={service} className="flex items-center space-x-2">
								<Checkbox
									id={service}
									checked={formData.services.includes(service)}
									onCheckedChange={() => toggleService(service)}
								/>
								<label htmlFor={service} className="text-sm">
									{service}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4 pt-4">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="terms"
							checked={formData.agreeToTerms}
							onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
							required
						/>
						<label htmlFor="terms" className="text-sm">
							I agree to the{" "}
							<Link href="/vendor/terms" className="text-purple-600 hover:underline">
								Vendor Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/vendor/privacy" className="text-purple-600 hover:underline">
								Privacy Policy
							</Link>
						</label>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="background"
							checked={formData.agreeToBackground}
							onCheckedChange={(checked) =>
								setFormData({ ...formData, agreeToBackground: checked })
							}
							required
						/>
						<label htmlFor="background" className="text-sm">
							I consent to background verification and quality checks
						</label>
					</div>
				</div>
			</div>
		</>
	)
}

export default Services