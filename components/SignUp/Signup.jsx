"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Gift, CheckCircle, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function Signup() {
	const [ showPassword, setShowPassword ] = useState(false)
	const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
	const [ formData, setFormData ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		userType: "",
		agreeToTerms: false,
	})
	const { toast } = useToast()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			toast({
				title: "Password Mismatch",
				description: "Passwords do not match. Please try again.",
				variant: "destructive",
			})
			return
		}
		toast({
			title: "Account Created!",
			description: "Welcome to Zappy. Please check your email to verify your account.",
		})
	}

	return (
		<>
			<Card className="border-0 shadow-xl animate-slide-in-right">
				<CardHeader className="text-center pb-6">
					<div className="flex justify-center mb-4 lg:hidden">
						<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
							<Gift className="w-8 h-8 text-white" />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
					<p className="text-muted-foreground">Start planning magical events today</p>
				</CardHeader>

				<CardContent className="space-y-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">First Name</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="John"
										value={formData.firstName}
										onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
										className="pl-10 border-2 focus:border-purple-500"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Last Name</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Doe"
										value={formData.lastName}
										onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
										className="pl-10 border-2 focus:border-purple-500"
										required
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									type="email"
									placeholder="john@example.com"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className="pl-10 border-2 focus:border-purple-500"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Phone</label>
							<div className="relative">
								<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									type="number"
									placeholder="+91 98765 43210"
									value={formData.phone}
									onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
									className="pl-10 border-2 focus:border-purple-500"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Password</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Create a strong password"
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className="pl-10 pr-10 border-2 focus:border-purple-500"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Confirm Password</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm your password"
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className="pl-10 pr-10 border-2 focus:border-purple-500"
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								checked={formData.agreeToTerms}
								onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
								required
							/>
							<label htmlFor="terms" className="text-sm">
								I agree to the{" "}
								<Link href="/terms" className="text-purple-600 hover:underline">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link href="/privacy" className="text-purple-600 hover:underline">
									Privacy Policy
								</Link>
							</label>
						</div>

						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
							disabled={!formData.agreeToTerms}
						>
							Create Account
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</form>

					<div className="relative">
						<Separator />
						<span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
							Or sign up with
						</span>
					</div>

					<Button variant="outline" className="border-2 w-full">
						<img src="/img/google.png" alt="" className="w-6" />
						<p className="text-muted-foreground">Continue with Google</p>
					</Button>

					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link href="/auth/login" className="text-purple-600 hover:underline font-medium">
								Sign in here
							</Link>
						</p>
					</div>

					{/* <div className="mt-3 p-3 bg-purple-50 shadow dark:bg-purple-900/20 rounded-lg">
						<p className="text-sm text-muted-foreground mb-2">Are you an event vendor or service provider?</p>
						<Link href="/vendor/register">
							<Button variant="outline" className="w-full border-purple-200 hover:bg-purple-100">
								<Store className="mr-2 h-4 w-4" />
								Register as Vendor
							</Button>
						</Link>
					</div> */}

				</CardContent>

			</Card>
		</>
	)
}
