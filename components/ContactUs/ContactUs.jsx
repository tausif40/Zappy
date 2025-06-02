"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function ContactUs() {

	const handleContactSubmit = (e) => {
		e.preventDefault()
		toast({
			title: "Message Sent!",
			description: "We'll get back to you within 24 hours.",
		})
	}

	return (
		<>
			<section className="pb-20 pt-28 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Contact Info */}
						<div className="animate-slide-in-left">
							<h2 className="text-3xl md:text-4xl font-bold mb-6 ">
								Let's Create Something
								<span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-1">
									Magical Together
								</span>
							</h2>
							<p className="text-xl text-muted-foreground mb-8">
								Have questions or ready to start planning? Our team of event specialists is here to help bring your
								vision to life.
							</p>

							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
										<Phone className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold">Call Us</p>
										<p className="text-muted-foreground">+91 98765 43210</p>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
										<Mail className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold">Email Us</p>
										<p className="text-muted-foreground">hello@zappy.com</p>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
										<MessageCircle className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold">WhatsApp</p>
										<p className="text-muted-foreground">+91 98765 43210</p>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<Card className="shadow-2xl border-0 animate-slide-in-right">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
								<form onSubmit={handleContactSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium mb-2">Name</label>
											<Input type="text" placeholder="Your name" className="border-2 focus:border-purple-500" />
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">Email</label>
											<Input type="email" placeholder="Your email address" className="border-2 focus:border-purple-500" />
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium mb-2">Phone (optional)</label>
											<Input type="number" placeholder="Your phone number" className="border-2 focus:border-purple-500" />
										</div>
										<div>
											<label className="block text-sm font-medium mb-2">Event Type (optional)</label>
											<Input type="text" placeholder="birthday, Wedding, etc." className="border-2 focus:border-purple-500" />
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium mb-2">Event Date (optional)</label>
										<Input type="date" className="border-2 focus:border-purple-500" />
									</div>

									<div>
										<label className="block text-sm font-medium mb-2">Message</label>
										<Textarea
											placeholder="Tell us about your event requirements..."
											className="border-2 focus:border-purple-500 min-h-[120px]"
										/>
									</div>

									<Button
										type="submit"
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
									>
										<Send className="mr-2 h-5 w-5" />
										Send Message
									</Button>
								</form>
							</CardContent>
						</Card>

					</div>
				</div>
			</section>
		</>
	)
}

export default ContactUs