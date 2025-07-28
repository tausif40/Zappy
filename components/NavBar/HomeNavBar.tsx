"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Moon, Sun, Menu, X, Gift, LogIn, UserPlus, ShoppingCart, MapPin, ChevronDown, User, Settings, Calendar, Heart, CreditCard, Award, LogOut, Bell, User2, ArrowRight } from "lucide-react"
import { useTheme } from "@/components/Providers/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Cookies from "js-cookie";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Birthday", href: "/birthday" },
	{ name: "Experiential", href: "/experiential-event" },
	{ name: "Products", href: "/products" },
	{ name: "Vendors", href: "/vendors" },
]

const userMenuItems = [
	{ name: "Dashboard", href: "/dashboard", icon: User },
	{ name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
	{ name: "Favorites", href: "/dashboard/favorites", icon: Heart },
	{ name: "Cart", href: "/dashboard/cart", icon: ShoppingCart },
	{ name: "Payments", href: "/dashboard/payments", icon: CreditCard },
	// { name: "Loyalty Program", href: "/dashboard/loyalty", icon: Award },
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

const user = {
	name: "User name",
	email: "user.name@email.com",
	avatar: "/placeholder.svg?height=40&width=40",
	role: "user", // user, vendor, admin
}

export default function HomeNavBar() {
	const route = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [selectedCity, setSelectedCity] = useState("mumbai")
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()
	const token = Cookies.get("token");

	useEffect(() => {
		setMounted(true)
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])


	useEffect(() => {
		console.log("token - ", token)
		token === undefined ? setIsLoggedIn(false) : setIsLoggedIn(true)
	}, [token])

	const handleLogout = () => {
		// setIsLoggedIn(false)
		setIsOpen(false)
		Object.keys(Cookies.get()).forEach(cookieName => {
			Cookies.remove(cookieName)
		})
		route.push('/')
		console.log("User logged out")
	}

	if (!mounted) return null

	return (
		<nav
			className={`fixed top-0 w-[100vw] z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-lg" : "bg-transparent"
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
							<div className="text-xs text-muted-foreground min-w-max">Magical Memories</div>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${pathname === item.href
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
						<Link href='/cart'>
							<Button variant="ghost" size="icon" className="relative hover:bg-purple-50 dark:hover:bg-purple-900/20">
								<ShoppingCart className="h-5 w-5" />
								<Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-white text-xs">
									2
								</Badge>
							</Button>
						</Link>

						{/* Notifications (only show when logged in) */}
						{isLoggedIn && (
							<Button variant="ghost" size="icon" className="relative hover:bg-purple-50 dark:hover:bg-purple-900/20">
								<Bell className="h-5 w-5" />
								<Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs">
									25
								</Badge>
							</Button>
						)}

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

						{/* User Profile or Auth Buttons */}
						{isLoggedIn ? (
							/* User Profile Dropdown */
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="flex items-center space-x-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
									>
										<Avatar className="w-8 h-8">
											<AvatarImage src={user.avatar || "/placeholder.svg"} />
											<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
												{user.name.split(" ").map((n) => n[0]).join("")}
											</AvatarFallback>
										</Avatar>
										<div className="hidden md:block text-left">
											<div className="text-sm font-medium">{user.name}</div>
											<div className="text-xs text-muted-foreground capitalize">{user.role}</div>
										</div>
										<ChevronDown className="h-3 w-3" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-64" align="end">
									{/* User Info Header */}
									<div className="flex items-center space-x-2 p-3 border-b">
										<Avatar className="w-10 h-10">
											<AvatarImage src={user.avatar || "/placeholder.svg"} />
											<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
												{user.name.split(" ").map((n) => n[0]).join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col">
											<p className="text-sm font-medium">{user.name}</p>
											<p className="text-xs text-muted-foreground">{user.email}</p>
											{/* <Badge variant="secondary" className="text-xs w-fit capitalize">
												{user.role}
											</Badge> */}
										</div>
									</div>

									{/* Quick Actions */}
									<div className="p-1">
										{userMenuItems.map((item) => (
											<DropdownMenuItem key={item.name} asChild>
												<Link href={item.href} className="flex items-center space-x-2 w-full">
													<item.icon className="h-4 w-4" />
													<span>{item.name}</span>
												</Link>
											</DropdownMenuItem>
										))}
									</div>

									<DropdownMenuSeparator />

									{/* Settings and Logout */}
									<div className="p-1">
										<DropdownMenuItem asChild>
											<Link href="/dashboard/settings" className="flex items-center space-x-2 w-full">
												<Settings className="h-4 w-4" />
												<span>Settings</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={handleLogout}
											className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
										>
											<LogOut className="h-4 w-4 mr-2" />
											<span>Logout</span>
										</DropdownMenuItem>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							// Auth Buttons - Desktop
							<div className="hidden md:flex items-center space-x-2">
								<Link href="/auth/login">
									<Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
										<LogIn className="w-4 h-4 mr-2" />
										Login
									</Button>
								</Link>
								<Link href="/signup">
									<Button variant='highlight' className=" text-white shadow hover:shadow-md transition-all duration-300">
										<UserPlus className="w-4 h-4 mr-2" />
										Sign Up
									</Button>
								</Link>
							</div>
						)}

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
									{/* Mobile User Info or Logo */}
									{isLoggedIn ? (
										<div className="border-b pb-4">
											<div className="flex items-center space-x-3 pb-4">
												<Avatar className="w-12 h-12">
													<AvatarImage src={user.avatar || "/placeholder.svg"} />
													<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
														{user.name.split(" ").map((n) => n[0]).join("")}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-semibold">{user.name}</div>
													<div className="text-sm text-muted-foreground">{user.email}</div>
													{/* <Badge variant="secondary" className="text-xs capitalize mt-1">
													{user.role}
												</Badge> */}
												</div>
											</div>
											<Button variant='secondary' className="w-full text-muted-foreground">
												<User2 className="w-4 h-4 mr-2" />
												Dashboard
												<ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										</div>
									) : (
										<div className="flex items-center space-x-2 pb-4 border-b">
											<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
												<Gift className="w-5 h-5 text-white" />
											</div>
											<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
												Zappy
											</span>
										</div>
									)}

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
									<div className="space-y-2">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setIsOpen(false)}
												className={`flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${pathname === item.href
													? "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
													: "text-muted-foreground hover:text-purple-600 hover:bg-purple-50/50"
													}`}
											>
												{item.name}
											</Link>
										))}
									</div>

									{/* Mobile Auth Buttons */}
									<div className="pt-4 border-t space-y-3">
										{isLoggedIn ? (
											<>
												<div className="space-y-2">
													<Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
														<Button variant="outline" className="w-full justify-start bg-transparent">
															<Settings className="w-4 h-4 mr-2" />
															Settings
														</Button>
													</Link>
													<Button
														variant="outline"
														className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
														onClick={handleLogout}
													>
														<LogOut className="w-4 h-4 mr-2" />
														Logout
													</Button>
												</div>
											</>
										) : (
											<>
												<Link href="/auth/login" onClick={() => setIsOpen(false)}>
													<Button variant="outline" className="w-full justify-start bg-transparent mb-2">
														<LogIn className="w-4 h-4 mr-2" />
														Login
													</Button>
												</Link>
												<Link href="/signup" onClick={() => setIsOpen(false)}>
													<Button variant='highlight' className="w-full justify-start text-white">
														<UserPlus className="w-4 h-4 mr-2" />
														Sign Up
													</Button>
												</Link>
											</>
										)}
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
