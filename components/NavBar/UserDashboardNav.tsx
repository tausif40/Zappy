"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, User, LogOut, Bell, Settings, Calendar, Heart, ShoppingCart, CreditCard, Home, Award, Gift, } from "lucide-react"
import { useTheme } from "@/components/Providers/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
	{ name: "Overview", href: "/dashboard", icon: Home },
	{ name: "My Bookings", href: "/bookings", icon: Calendar },
	{ name: "Favorites", href: "/favorites", icon: Heart },
	{ name: "Cart", href: "/cart", icon: ShoppingCart },
	{ name: "Payments", href: "/payments", icon: CreditCard },
	{ name: "Loyalty Program", href: "/loyalty", icon: Award },
]

export function UserDashboardNav() {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	// Mock user data
	const user = {
		name: "Priya Sharma",
		email: "priya.sharma@email.com",
		avatar: "/placeholder.svg?height=40&width=40",
	}

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
			className={`fixed top-0 w-screen z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-lg" : "bg-background"}`}
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
								className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
									? "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
									: "text-muted-foreground hover:text-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
									}`}
							>
								<item.icon className="w-4 h-4 mr-2" />
								{item.name}
								{(pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))) && (
									<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full animate-pulse"></div>
								)}
							</Link>
						))}
					</div>

					{/* Right side actions */}
					<div className="flex items-center space-x-3">
						{/* Notifications */}
						<Button variant="ghost" size="icon" className="relative hover:bg-purple-50 dark:hover:bg-purple-900/20">
							<Bell className="h-5 w-5" />
							<Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs">
								2
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

						{/* User Profile Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div
									className="flex items-center space-x-2"
								>
									<Avatar className="w-8 h-8">
										<AvatarImage src={user.avatar || "/placeholder.svg"} />
										<AvatarFallback>
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="hidden md:block text-left">
										<div className="text-sm font-medium">{user.name}</div>
										<div className="text-xs text-muted-foreground">User</div>
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end">
								<div className="flex items-center space-x-2 p-2">
									<Avatar className="w-8 h-8">
										<AvatarImage src={user.avatar || "/placeholder.svg"} />
										<AvatarFallback>
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium">{user.name}</p>
										<p className="text-xs text-muted-foreground">{user.email}</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-red-600">
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Mobile menu button */}
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="lg:hidden">
									{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px]">
								<div className="flex flex-col space-y-4 mt-8">
									{/* Mobile User Info */}
									<div className="flex items-center space-x-3 pb-4 border-b">
										<Avatar className="w-12 h-12">
											<AvatarImage src={user.avatar || "/placeholder.svg"} />
											<AvatarFallback>
												{user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-semibold">{user.name}</div>
											<div className="text-sm text-muted-foreground">{user.email}</div>
										</div>
									</div>

									{/* Mobile Navigation */}
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setIsOpen(false)}
											className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
												? "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
												: "text-muted-foreground hover:text-purple-600 hover:bg-purple-50/50"
												}`}
										>
											<item.icon className="w-5 h-5 mr-3" />
											{item.name}
										</Link>
									))}

									{/* Mobile Actions */}
									<div className="pt-4 border-t space-y-3">
										<Button variant="outline" className="w-full justify-start">
											<Settings className="w-4 h-4 mr-2" />
											Settings
										</Button>
										<Button
											variant="outline"
											className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
										>
											<LogOut className="w-4 h-4 mr-2" />
											Logout
										</Button>
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
