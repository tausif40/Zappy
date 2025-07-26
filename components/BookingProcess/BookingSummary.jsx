import React from 'react'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function BookingSummary({ basePrice, selectedTheme, totalPrice }) {

	const handleContinue = () => {
		if (!selectedTheme) {
			toast({
				title: "Theme Required",
				description: "Please select a theme to continue.",
				variant: "destructive",
			})
			return
		}

		// Navigate to schedule page (skipping add-ons)
		// window.location.href = `/booking/${eventId}/schedule?theme=${selectedTheme}`
	}

	return (
		<>
			<div className="lg:col-span-1">
				<Card className="border-0 shadow-lg sticky top-24">
					<CardContent className="p-4">
						<h3 className="font-semibold mb-3">Summary</h3>

						<div className="space-y-2 mb-4 text-sm">
							<div className="flex justify-between">
								<span>Base Package</span>
								<span>₹{basePrice.toLocaleString()}</span>
							</div>

							{selectedTheme && selectedTheme.price > 0 && (
								<div className="flex justify-between">
									<span>{selectedTheme.name}</span>
									<span>+₹{selectedTheme.price.toLocaleString()}</span>
								</div>
							)}

							<div className="border-t pt-2">
								<div className="flex justify-between font-semibold">
									<span>Total</span>
									<span className="text-purple-600">₹{totalPrice.toLocaleString()}</span>
								</div>
							</div>
						</div>

						{selectedTheme && (
							<div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
								<div className="flex items-center space-x-2 mb-1">
									<div className="text-purple-500">{getThemeIcon(selectedTheme)}</div>
									<span className="font-medium text-sm">{selectedTheme?.name}</span>
								</div>
								<p className="text-xs text-muted-foreground">{selectedTheme?.description}</p>
							</div>
						)}

						<Button
							onClick={handleContinue}
							disabled={!selectedTheme}
							className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
						>
							Continue
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default BookingSummary;