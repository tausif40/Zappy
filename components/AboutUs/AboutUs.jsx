"use client"

import Image from "next/image"
import { Users, Award, Heart, Target, Eye, Zap, Shield, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutUs() {
	const stats = [
		{ number: "10,000+", label: "Happy Families", icon: Users },
		{ number: "500+", label: "Verified Vendors", icon: Shield },
		{ number: "50+", label: "Cities Covered", icon: Target },
		{ number: "5", label: "Years of Excellence", icon: Award },
	]


	const values = [
		{
			icon: Heart,
			title: "Products & Services",
			description: "Every decision we make is centered around creating joy and wonder.",
		},
		{
			icon: Shield,
			title: "Trust & Safety",
			description: "We thoroughly vet all vendors and ensure the highest safety standards.",
		},
		{
			icon: Zap,
			title: "Innovation",
			description: "Constantly evolving to bring new and exciting experiences to families.",
		},
		{
			icon: CheckCircle,
			title: "Quality Assurance",
			description: "We guarantee exceptional service quality in every event we facilitate.",
		},
	]

	const team = [
		{
			name: "Priya Sharma",
			role: "Founder & CEO",
			image: "/placeholder.svg?height=200&width=200",
			bio: "Former event planner with 10+ years of experience in creating magical moments for children.",
		},
		{
			name: "Rajesh Kumar",
			role: "Head of Operations",
			image: "/placeholder.svg?height=200&width=200",
			bio: "Operations expert ensuring seamless event execution across all our partner vendors.",
		},
		{
			name: "Anita Patel",
			role: "Customer Experience Lead",
			image: "/placeholder.svg?height=200&width=200",
			bio: "Dedicated to ensuring every family has an exceptional experience with our platform.",
		},
		{
			name: "Vikram Singh",
			role: "Technology Director",
			image: "/placeholder.svg?height=200&width=200",
			bio: "Building innovative solutions to make event planning effortless for families.",
		},
	]

	const milestones = [
		{
			year: "2019",
			title: "Company Founded",
			description: "Started with a vision to make children's events more accessible and magical.",
		},
		{
			year: "2020",
			title: "First 1,000 Events",
			description: "Reached our first milestone of successfully organizing 1,000 events.",
		},
		{
			year: "2021",
			title: "Multi-City Expansion",
			description: "Expanded operations to 10 major cities across India.",
		},
		{
			year: "2022",
			title: "Vendor Network Growth",
			description: "Built a network of 500+ verified vendors across the country.",
		},
		{
			year: "2023",
			title: "Technology Innovation",
			description: "Launched our advanced booking platform with AI-powered recommendations.",
		},
		{
			year: "2024",
			title: "10,000+ Happy Families",
			description: "Celebrated serving over 10,000 families with magical experiences.",
		},
	]

	return (
		<div className="min-h-screen pt-16 bg-background">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 py-10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="animate-slide-in-left">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								Creating
								<p className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent py-2">
									Magical Memories
								</p>
								Since 2019
							</h1>
							<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
								We believe every child deserves to experience the magic of perfectly planned celebrations. Our mission
								is to connect families with trusted vendors who share our passion for creating unforgettable moments.
							</p>
							{/* <div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
								>
									Our Story
								</Button>
								<Button size="lg" variant="outline">
									Meet the Team
								</Button>
							</div> */}
						</div>
						<div className="flex flex-col items-center lg:items-end">
							<div className="animate-slide-in-right">
								<Image
									src="/placeholder.svg?height=400&width=400"
									alt="Team celebrating with children"
									width={500}
									height={400}
									className="rounded-2xl shadow-2xl hover-lift"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
								<stat.icon className="w-8 h-8 mx-auto mb-4 animate-bounce-slow" />
								<div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
								<div className="text-purple-100">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12">
						<Card className="p-8 border-0 shadow-lg animate-slide-in-left">
							<div className="flex items-center mb-6">
								<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
									<Target className="w-6 h-6 text-white" />
								</div>
								<h2 className="text-2xl font-bold">Our Mission</h2>
							</div>
							<p className="text-muted-foreground leading-relaxed">
								To make every child's special day extraordinary by connecting families with trusted, creative vendors
								who understand the importance of creating magical moments. We strive to remove the stress from event
								planning while ensuring every celebration is filled with joy, wonder, and unforgettable memories.
							</p>
						</Card>

						<Card className="p-8 border-0 shadow-lg animate-slide-in-right">
							<div className="flex items-center mb-6">
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
									<Eye className="w-6 h-6 text-white" />
								</div>
								<h2 className="text-2xl font-bold">Our Vision</h2>
							</div>
							<p className="text-muted-foreground leading-relaxed">
								To become India's most trusted platform for children's events, where every family can easily access
								high-quality, safe, and creative event services. We envision a world where planning a child's
								celebration is as joyful as the celebration itself.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							The principles that guide everything we do
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value, index) => (
							<Card
								key={index}
								className="text-center p-6 border-0 shadow-lg hover-lift animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
									<value.icon className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold mb-2">{value.title}</h3>
								<p className="text-muted-foreground">{value.description}</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team */}
			<section className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">The passionate people behind KidsEvents</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{team.map((member, index) => (
							<Card
								key={index}
								className="text-center overflow-hidden border-0 shadow-lg hover-lift animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="relative">
									<Image
										src={member.image || "/placeholder.svg"}
										alt={member.name}
										width={200}
										height={200}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-1">{member.name}</h3>
									<p className="text-purple-600 font-medium mb-3">{member.role}</p>
									<p className="text-sm text-muted-foreground">{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
						<p className="text-xl text-muted-foreground">Key milestones in our mission to create magical memories</p>
					</div>

					<div className="relative">
						{/* Timeline Line */}
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

						<div className="space-y-8">
							{milestones.map((milestone, index) => (
								<div
									key={index}
									className="relative flex items-start animate-slide-up"
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
										{milestone.year}
									</div>
									<Card className="ml-8 flex-1 p-6 border-0 shadow-lg">
										<h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
										<p className="text-muted-foreground">{milestone.description}</p>
									</Card>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white my-10">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="animate-slide-up">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
						<p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
							Whether you're a family looking for the perfect event or a vendor wanting to create magical experiences,
							we'd love to have you as part of our community.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href='/events'>
								<Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
									Plan Your Event
								</Button>
							</Link>
							<Button
								size="lg"
								variant="outline"
								className="border-white text-purple-600 hover:bg-gray-100 hover:text-purple-600"
							>
								Become a Vendor
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
