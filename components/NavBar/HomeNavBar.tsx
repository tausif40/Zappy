"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, Gift, LogIn, UserPlus, ShoppingCart, MapPin, ChevronDown } from "lucide-react"
import { useTheme } from "@/components/Providers/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Kids Events", href: "/kids-events" },
	{ name: "Products", href: "/products" },
	{ name: "Vendors", href: "/vendors" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
]

const cities = [
	{ value: "mumbai", label: "Mumbai", state: "Maharashtra" },
	{ value: "delhi", label: "Delhi", state: "NCR" },
	{ value: "bangalore", label: "Bangalore", state: "Karnataka" },
	{ value: "pune", label: "Pune", state: "Maharashtra" },
	{ value: "hyderabad", label: "Hyderabad", state: "Telangana" },
	{ value: "chennai", label: "Chennai", state: "Tamil Nadu" },
	{ value: "kolkata", label: "Kolkata", state: "West Bengal" },
	{ value: "ahmedabad", label: "Ahmedabad", state: "Gujarat" },
	{ value: "jaipur", label: "Jaipur", state: "Rajasthan" },
	{ value: "lucknow", label: "Lucknow", state: "Uttar Pradesh" },
	{ value: "kanpur", label: "Kanpur", state: "Uttar Pradesh" },
	{ value: "nagpur", label: "Nagpur", state: "Maharashtra" },
	{ value: "indore", label: "Indore", state: "Madhya Pradesh" },
	{ value: "thane", label: "Thane", state: "Maharashtra" },
	{ value: "bhopal", label: "Bhopal", state: "Madhya Pradesh" },
	{ value: "visakhapatnam", label: "Visakhapatnam", state: "Andhra Pradesh" },
	{ value: "pimpri", label: "Pimpri-Chinchwad", state: "Maharashtra" },
	{ value: "patna", label: "Patna", state: "Bihar" },
	{ value: "vadodara", label: "Vadodara", state: "Gujarat" },
	{ value: "ghaziabad", label: "Ghaziabad", state: "Uttar Pradesh" },
]

export default function HomeNavBar() {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [selectedCity, setSelectedCity] = useState("mumbai")
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	useEffect(() => {
		setMounted(true)

		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	if (!mounted) return null

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-lg" : "bg-transparent"
				}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2 group">
						<div className="relative">
							<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transition-transform duration-300">
								<Gift className="w-6 h-6 text-white" />
							</div>
							{/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div> */}
						</div>
						<div className="">
							<span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Zappy
							</span>
							<div className="text-xs text-muted-foreground">Magical Memories</div>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${pathname === item.href
									? "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
									: "text-muted-foreground hover:text-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
									}`}
							>
								{item.name}
								{pathname === item.href && (
									<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full animate-pulse"></div>
								)}
							</Link>
						))}
					</div>

					{/* Right side actions */}
					<div className="flex items-center space-x-3">
						{/* Location Selector */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="hidden md:flex items-center space-x-1 hover:bg-purple-50 dark:hover:bg-purple-900/20"
								>
									<MapPin className="h-4 w-4" />
									<span className="text-sm">{cities.find((c) => c.value === selectedCity)?.label}</span>
									<ChevronDown className="h-3 w-3" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
								{cities.map((city) => (
									<DropdownMenuItem
										key={city.value}
										onClick={() => setSelectedCity(city.value)}
										className={selectedCity === city.value ? "bg-purple-50 dark:bg-purple-900/20" : ""}
									>
										<div className="flex flex-col">
											<span className="font-medium">{city.label}</span>
											<span className="text-xs text-muted-foreground">{city.state}</span>
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Shopping Cart */}
						<Button variant="ghost" size="icon" className="relative hover:bg-purple-50 dark:hover:bg-purple-900/20">
							<ShoppingCart className="h-5 w-5" />
							<Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-white text-xs">
								3
							</Badge>
						</Button>

						{/* Theme Toggle */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === "light" ? "dark" : "light")}
							className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
						>
							{theme === "light" ? (
								<Moon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
							) : (
								<Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
							)}
						</Button>

						{/* Auth Buttons - Desktop */}
						<div className="hidden md:flex items-center space-x-2">
							<Link href="/login">
								<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
									<LogIn className="w-4 h-4 mr-2" />
									Login
								</Button>
							</Link>
							<Link href="/signup">
								<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
									<UserPlus className="w-4 h-4 mr-2" />
									Sign Up
								</Button>
							</Link>
						</div>

						{/* Mobile menu button */}
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="lg:hidden">
									{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
								<div className="flex flex-col space-y-4 mt-8">
									{/* Mobile Logo */}
									<div className="flex items-center space-x-2 pb-4 border-b">
										<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
											<Gift className="w-5 h-5 text-white" />
										</div>
										<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
											Zappy
										</span>
									</div>

									{/* Mobile Location Selector */}
									<div className="pb-4 border-b">
										<label className="block text-sm font-medium mb-2">Select City</label>
										<Select value={selectedCity} onValueChange={setSelectedCity}>
											<SelectTrigger>
												<MapPin className="w-4 h-4 mr-1" />
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{cities.map((city) => (
													<SelectItem key={city.value} value={city.value}>
														<div className="flex flex-col">
															<span>{city.label}</span>
															<span className="text-xs text-muted-foreground">{city.state}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									{/* Mobile Navigation */}
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setIsOpen(false)}
											className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${pathname === item.href
												? "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
												: "text-muted-foreground hover:text-purple-600 hover:bg-purple-50/50"
												}`}
										>
											{item.name}
										</Link>
									))}

									{/* Mobile Auth Buttons */}
									<div className="pt-4 border-t flex flex-col gap-2">
										<Link href="/login" onClick={() => setIsOpen(false)}>
											<Button variant="outline" className="w-full justify-start">
												<LogIn className="w-4 h-4 mr-2" />
												Login	
											</Button>
										</Link>

										<Link href="/signup" onClick={() => setIsOpen(false)}>
											<Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
												<UserPlus className="w-4 h-4 mr-2" />
												Sign Up
											</Button>
										</Link>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	)
}
