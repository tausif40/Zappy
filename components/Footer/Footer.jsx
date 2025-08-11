"use client"

import Link from "next/link"
import { Gift, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
	const currentYear = new Date().getFullYear()

	const quickLinks = [
		{ name: "Home", href: "/" },
		{ name: "Birthday", href: "/birthday" },
		{ name: "Products", href: "/products" },
		{ name: "Vendors", href: "/vendors" },
		{ name: "About US", href: "/about-us" },
		{ name: "Contact", href: "/contact-us" },
	]

	const services = [
		{ name: "Birthday Parties", href: "/kids-events?category=birthday" },
		{ name: "Baby Showers", href: "/kids-events?category=themed" },
		{ name: "School Events", href: "/kids-events?category=educational" },
		{ name: "Holiday Parties", href: "/kids-events?category=outdoor" },
	]
	const vendors = [
		{ name: "Join as Vendor", href: "/vendor/register" },
		{ name: "Vendor Login", href: "/auth/login" },
		// { name: "	Resources", href: "/" },
		// { name: "Success Stories", href: "/" },
	]

	const cities = [
		{ name: "Mumbai", href: "/kids-events?city=mumbai" },
		{ name: "Delhi", href: "/kids-events?city=delhi" },
		{ name: "Bangalore", href: "/kids-events?city=bangalore" },
		{ name: "Pune", href: "/kids-events?city=pune" },
		{ name: "Hyderabad", href: "/kids-events?city=hyderabad" },
		{ name: "Chennai", href: "/kids-events?city=chennai" },
	]

	const support = [
		{ name: "Help Center", href: "/help" },
		{ name: "Safety Guidelines", href: "/safety" },
		{ name: "Cancellation Policy", href: "/cancellation" },
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
		{ name: "Vendor Guidelines", href: "/vendor-guidelines" },
	]

	return (
		<footer className="bg-[#111827] border-t">
			{/* Newsletter Section */}
			{/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h3 className="text-2xl font-bold mb-2">Stay Updated with Zappy!</h3>
							<p className="text-purple-100">
								Get the latest updates on new themes, special offers, and magical event ideas delivered to your inbox.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<Input
								placeholder="Enter your email address"
								className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:bg-white/20"
							/>
							<Button className="bg-white text-purple-600 hover:bg-purple-50 whitespace-nowrap">Subscribe Now</Button>
						</div>
					</div>
				</div>
			</div> */}

			{/* Main Footer Content */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:px-12">
					{/* Quick Links */}
					<div>
						<h4 className="font-semibold text-white mb-4">Quick Links</h4>
						<ul className="space-y-3">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-slate-300 hover:text-purple-600 transition-colors text-sm" >
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h4 className="font-semibold text-white mb-4">Services</h4>
						<ul className="space-y-3">
							{services.map((service) => (
								<li key={service.name}>
									<Link href={service.href} className="text-slate-300 hover:text-purple-600 transition-colors text-sm">
										{service.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support */}
					<div>
						<h4 className="font-semibold text-white mb-4">For Vendors</h4>
						<ul className="space-y-3">
							{vendors.map((vendor) => (
								<li key={vendor.name}>
									<Link href={vendor.href} className="text-slate-300 hover:text-purple-600 transition-colors text-sm"	>
										{vendor.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Brand Section */}
					<div className="lg:col-span-2">
						<Link href="/" className="flex items-center space-x-2 mb-4">
							<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
								<Gift className="w-6 h-6 text-white" />
							</div>
							<span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Zappy
							</span>
						</Link>
						<p className="text-slate-300 mb-6 max-w-md">
							Creating magical and memorable events for children of all ages.
						</p>

						{/* Contact Info */}
						<div className="space-y-3 text-slate-300">
							<div className="flex items-center space-x-3">
								<Phone className="w-4 h-4 text-purple-600" />
								<span className="text-sm">+91 98765 43210</span>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="w-4 h-4 text-purple-600" />
								<span className="text-sm">hello@zappy.com</span>
							</div>
							<div className="flex items-center space-x-3">
								<MapPin className="w-4 h-4 text-purple-600" />
								<span className="text-sm">Mumbai, Delhi, Bangalore & 47 more cities</span>
							</div>
						</div>

						{/* Social Links */}
						<div className="flex space-x-8 mt-6">
							<div className="text-slate-300 hover:text-purple-300">
								<Facebook className="w-4 h-4" />
							</div>
							<div className="text-slate-300 hover:text-purple-300">
								<Twitter className="w-4 h-4" />
							</div>
							<div className="text-slate-300 hover:text-purple-300">
								<Instagram className="w-4 h-4" />
							</div>
							<div className="text-slate-300 hover:text-purple-300">
								<Youtube className="w-4 h-4" />
							</div>
						</div>
					</div>

				</div>

				<Separator className="my-8" />

				{/* Bottom Section */}
				<div className="flex flex-col md:flex-row justify-between items-center md:space-y-0">
					<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
						<p className="text-sm text-muted-foreground">© {currentYear} Zappy. All rights reserved.</p>
						{/* <div className="flex items-center space-x-1 text-sm text-muted-foreground">
							<span>Made with</span>
							<Heart className="w-4 h-4 text-red-500 fill-current" />
							<span>for kids everywhere</span>
						</div> */}
					</div>

					<div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
						<Link href="/privacy-policy" className="hover:text-purple-600 transition-colors">
							Privacy Policy
						</Link>
						<Link href="/terms-service" className="hover:text-purple-600 transition-colors">
							Terms of Service
						</Link>
						{/* <Link href="/cookies" className="hover:text-purple-600 transition-colors">
							Cookie Policy
						</Link>
						<Link href="/sitemap" className="hover:text-purple-600 transition-colors">
							Sitemap
						</Link> */}
					</div>
				</div>

				{/* Trust Badges */}
				{/* <div className="mt-8 pt-8 border-t">
					<div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
						<div className="text-xs text-center">
							<div className="font-semibold">SSL Secured</div>
							<div className="text-muted-foreground">256-bit encryption</div>
						</div>
						<div className="text-xs text-center">
							<div className="font-semibold">Verified Vendors</div>
							<div className="text-muted-foreground">Background checked</div>
						</div>
						<div className="text-xs text-center">
							<div className="font-semibold">24/7 Support</div>
							<div className="text-muted-foreground">Always here to help</div>
						</div>
						<div className="text-xs text-center">
							<div className="font-semibold">Money Back</div>
							<div className="text-muted-foreground">Guarantee policy</div>
						</div>
					</div>
				</div> */}
			</div>
		</footer>
	)
}
