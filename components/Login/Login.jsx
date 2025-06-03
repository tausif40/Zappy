"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
	const [ showPassword, setShowPassword ] = useState(false)
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("")
	const { toast } = useToast()

	const handleSubmit = (e) => {
		e.preventDefault()
		toast({
			title: "Login Successful!",
			description: "Welcome back to Zappy.",
		})
	}

	return (
		<div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-yellow-900/10 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Card className="border-0 shadow-2xl animate-slide-up">
					<CardHeader className="text-center pb-2">
						<div className="flex justify-center">
							<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
								<Gift className="w-6 h-6 text-white" />
							</div>
						</div>
						<CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
						<p className="text-muted-foreground">Sign in to your Zappy account</p>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Email</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
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
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
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

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Checkbox id="remember" />
									<label htmlFor="remember" className="text-sm">
										Remember me
									</label>
								</div>
								<Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
									Forgot password?
								</Link>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
							>
								Sign In
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</form>

						<div className="relative">
							<Separator />
							<span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
								Or continue with
							</span>
						</div>

						<Button variant="outline" className="border-2 w-full">
							<img src="/img/google.png" alt="" className="w-6" />
							<p className="text-muted-foreground">Continue with Google</p>
						</Button>

						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Don't have an account?{" "}
								<Link href="/signup" className="text-purple-600 hover:underline font-medium">
									Sign up here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Features */}
				{/* <div className="mt-8 grid grid-cols-3 gap-4 text-center">
					<div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
						<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
							<span className="text-white font-bold">1</span>
						</div>
						<p className="text-xs text-muted-foreground">Browse Events</p>
					</div>
					<div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
						<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
							<span className="text-white font-bold">2</span>
						</div>
						<p className="text-xs text-muted-foreground">Book Instantly</p>
					</div>
					<div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
						<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
							<span className="text-white font-bold">3</span>
						</div>
						<p className="text-xs text-muted-foreground">Create Memories</p>
					</div>
				</div> */}
			</div>
		</div>
	)
}
