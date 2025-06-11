import React from "react"
import Signup from "@/components/SignUp/Signup"
import { CheckCircle, Gift, Store } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HomeNavBar from "@/components/NavBar/HomeNavBar"

export default function page() {

	const benefits = [
		"Access to 500+ verified vendors",
		"Instant booking and confirmation",
		"24/7 customer support",
		"Exclusive discounts and offers",
		"Event planning assistance",
		"Secure payment processing",
	]

	return (
		<>
			<HomeNavBar />
			<div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-yellow-900/10 flex items-center justify-center p-4">
				<div className="w-full container mx-auto px-0 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 py-16">
					{/* Left Side - Benefits */}
					<div className="hidden lg:flex flex-col justify-start animate-slide-in-left">
						<div className="space-y-6 lg:pt-16">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join the Zappy Family</h2>
							<p className="text-xl text-muted-foreground mb-8">
								Create an account and unlock a world of magical experiences for your children.
							</p>

							<div className="space-y-4">
								{benefits.map((benefit, index) => (
									<div key={index} className="flex items-center space-x-3">
										<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
										<span className="text-muted-foreground">{benefit}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<Signup />

					<div className="col-span-2">
						<Card className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-600/30 dark:to-pink-600/30 text-white border-0">
							<CardContent className="p-8 text-center">
								<h3 className="text-2xl font-bold mb-4">Join Our Vendor Network</h3>
								<p className="text-purple-100 mb-6 max-w-2xl mx-auto">
									Are you an event planner or entertainer? Join our platform and connect with peoples looking for amazing
									events.
								</p>
								<Link href='/vendor/register'>
									<Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
										Become a Vendor
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>

				</div>
			</div>
		</>
	)
}
