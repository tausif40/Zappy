"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, Crown, Sparkles, Heart, Wand2, ChevronRight, MoveRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function Themes() {
	const params = useParams();
	const route = useRouter();
	const eventId = params.id;
	const { toast } = useToast();
	const [ selectedTheme, setSelectedTheme ] = useState("")

	const themes = [
		{
			id: "classic-princess",
			name: "Classic Princess",
			description: "Traditional princess theme with pink and gold decorations",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Pink & Gold Decor", "Princess Crown", "Royal Backdrop", "Fairy Tale Props" ],
			popular: true,
		},
		{
			id: "frozen-princess",
			name: "Frozen Princess",
			description: "Ice queen theme with blue and silver decorations",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Blue & Silver Decor", "Snowflake Props", "Ice Castle Backdrop", "Frozen Characters" ],
			popular: false,
		},
		{
			id: "unicorn-princess",
			name: "Unicorn Princess",
			description: "Magical unicorn theme with rainbow colors",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Rainbow Decor", "Unicorn Props", "Magical Backdrop", "Glitter Effects" ],
			popular: false,
		},
		{
			id: "fairy-princess",
			name: "Fairy Princess",
			description: "Enchanted garden theme with flowers and butterflies",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Garden Decor", "Butterfly Props", "Flower Backdrop", "Fairy Wings" ],
			popular: false,
		},
		{
			id: "royal-princess",
			name: "Royal Princess",
			description: "Elegant royal theme with purple and gold",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Purple & Gold Decor", "Royal Crown", "Castle Backdrop", "Velvet Props" ],
			popular: false,
		},
		{
			id: "mermaid-princess",
			name: "Mermaid Princess",
			description: "Under the sea theme with aqua and pearl colors",
			image: "/placeholder.svg?height=200&width=300",
			features: [ "Aqua Decor", "Seashell Props", "Ocean Backdrop", "Mermaid Tail" ],
			popular: false,
		},
	]

	const breadcrumb = [
		{ name: 'Home', href: '/' },
		{ name: 'Birthday', href: '/birthday' },
		{ name: 'Princess Theme Birthday Party', href: '/' },
		{ name: 'Choose Theme', href: '' },
	];

	const basePrice = 8999

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
		route.push(`/birthday/booking/${eventId}/add-ons`)
	}

	const getThemeIcon = (themeId) => {
		switch (themeId) {
			case "classic-princess":
				return <Crown className="h-6 w-6" />
			case "frozen-princess":
				return <Sparkles className="h-6 w-6" />
			case "unicorn-princess":
				return <Heart className="h-6 w-6" />
			case "fairy-princess":
				return <Wand2 className="h-6 w-6" />
			case "royal-princess":
				return <Crown className="h-6 w-6" />
			case "mermaid-princess":
				return <Sparkles className="h-6 w-6" />
			default:
				return <Crown className="h-6 w-6" />
		}
	}

	const selectedThemeData = themes.find((theme) => theme.id === selectedTheme)
	const totalPrice = basePrice + (selectedThemeData?.price || 0)

	return (
		<div className="min-h-screen pt-16 bg-background">

			<div className="bg-muted/30 py-4">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex items-center text-sm text-muted-foreground space-x-1">
						{breadcrumb.map((item, index) => (
							<div key={index} className="flex items-center">
								{index !== 0 && <ChevronRight className="w-4 h-4 mx-1" />}
								{item.href ? (
									<Link href={item.href}>
										<span className="hover:text-primary">{item.name}</span>
									</Link>
								) : (
									<span className="font-medium text-foreground">{item.name}</span>
								)}
							</div>
						))}
					</nav>
				</div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20" onClick={() => route.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Event Details
					</Button>
					<div className="text-sm text-muted-foreground">Step 1 of 4: Theme Selection</div>
				</div>

				{/* Progress Bar */}
				{/* <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
					<div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: "33%" }}></div>
				</div> */}

				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">Choose Your Theme</h1>
					<p className="text-muted-foreground text-sm">
						Select the perfect theme for your princess party. Each theme includes unique decorations and props.
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-3 p-4 bg-highlights rounded-lg">
						<RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
							<div className="grid md:grid-cols-2 gap-6">
								{themes.map((theme) => (
									<div key={theme.id} className="relative">
										<RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
										<Label htmlFor={theme.id} className="">
											<Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${selectedTheme === theme.id ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"} flex`}>

												<div className="relative">
													<div className="w-40 h-28 ">
														<Image
															src={theme.image || "/placeholder.svg"}
															alt={theme.name}
															fill
															className="object-cover"
														/>
													</div>
													{theme.popular && (
														<Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
															Most Popular
														</Badge>
													)}
													{selectedTheme === theme.id && (
														<div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
															<div className="bg-white rounded-full p-2">
																<CheckCircle className="h-6 w-6 text-purple-500" />
															</div>
														</div>
													)}
												</div>

												<CardContent className="p-6">
													<div className="flex items-center space-x-3 mb-3">
														<div className="text-purple-500">{getThemeIcon(theme.id)}</div>
														<h3 className="text-xl font-semibold">{theme.name}</h3>
													</div>
													<p className="text-muted-foreground mb-4 font-normal">{theme.description}</p>
													<p className="absolute bottom-3 right-3 text-blue-500 mt-2 text-end font-light cursor-pointer hover:underline">more details</p>
													{/* <div className="space-y-2">
														<h4 className="font-medium text-sm">Includes:</h4>
														<div className="grid grid-cols-4 gap-1">
															{theme.features.map((feature, index) => (
																<div key={index} className="flex items-center space-x-2 text-sm">
																	<CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
																	<span>{feature}</span>
																</div>
															))}
														</div>
													</div> */}
												</CardContent>

											</Card>
										</Label>
									</div>
								))}
							</div>
						</RadioGroup>
					</div>

					{/* Compact Sidebar */}
					<div className="lg:col-span-1">
						<Card className="border-0 shadow-lg sticky top-24">
							<CardContent className="p-4">
								<h3 className="font-semibold mb-3">Summary</h3>

								<div className="space-y-2 mb-4 text-sm">
									<div className="flex justify-between">
										<span>Base Package</span>
										<span>₹{basePrice.toLocaleString()}</span>
									</div>

									{selectedThemeData && selectedThemeData.price > 0 && (
										<div className="flex justify-between">
											<span>{selectedThemeData.name}</span>
											<span>+₹{selectedThemeData.price.toLocaleString()}</span>
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
											<span className="font-medium text-sm">{selectedThemeData?.name}</span>
										</div>
										<p className="text-xs text-muted-foreground">{selectedThemeData?.description}</p>
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
				</div>
			</div>
		</div >
	)
}
