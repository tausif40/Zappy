"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Gift, LoaderCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/userSchema"
import { useDispatch } from "react-redux"
import { login } from "@/store/features/auth-slice"
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie";
import { getAndClearReturnUrl } from "@/lib/utils";

export default function Login() {
	const { toast } = useToast()
	const route = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();
	const [ showPassword, setShowPassword ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(false)

	// Handle Google sign-in success and check for return URL
	useEffect(() => {
		const handleGoogleSignIn = () => {
			// Check if there's a return URL stored
			const returnTo = getAndClearReturnUrl();
			if (returnTo) {
				console.log('Google sign-in successful, redirecting to return URL:', returnTo);
				route.push(returnTo);
			}
		};

		// Listen for storage changes (when Google sign-in completes)
		const handleStorageChange = (e) => {
			if (e.key === 'token' && e.newValue) {
				handleGoogleSignIn();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		// Also check on component mount
		if (searchParams.get('callbackUrl')) {
			handleGoogleSignIn();
		}

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [ route, searchParams ]);

	// const { data: session, status } = useSession();

	// console.log(session, status);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: zodResolver(loginSchema) })

	console.log(errors)

	const onSubmit = async (data) => {
		console.log(data);
		try {
			setIsLoading(true);
			const res = await dispatch(login(data)).unwrap();
			console.log(res);
			if (res.status === 200) {
				Cookies.set("token", res.data.accessToken);

				// Check if there's a return URL stored
				const returnTo = getAndClearReturnUrl();
				if (returnTo) {
					// console.log('Redirecting to return URL:', returnTo);
					route.push(returnTo);
					toast({ variant: "success", title: "Login Successful!", description: "Welcome back to Zappy." });
				} else {
					// Default redirect to dashboard
					route.push("/dashboard");
					toast({ variant: "success", title: "Login Successful!", description: "Welcome back to Zappy." });
				}
			} else {
				throw new Error(res.data.message || "Login failed. Please try again.");
			}
		} catch (error) {
			console.log("Error logging in: ", error);
			toast({ variant: "destructive", title: "Login failed!", description: error?.message || "Something went wrong. Please try again." });
		} finally {
			setIsLoading(false);
		}
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
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="space-y-1">
								<label className="text-sm font-medium">Mobile No</label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										{...register("mobile")}
										type="number"
										placeholder="Enter your mobile"
										className="pl-10 border-2 focus:border-purple-500"
									/>
								</div>
								{errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
							</div>

							<div className="space-y-1">
								<label className="text-sm font-medium">Password</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										{...register("password")}
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										className="pl-10 pr-10 border-2 focus:border-purple-500"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</button>
								</div>
								{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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
								variant='highlight'
								className="w-full"
								disabled={isLoading}
							>
								LogIn
								{isLoading ? <LoaderCircle className='animate-spin h-5 w-5 ml-2' /> : <ArrowRight className="ml-2 h-4 w-4" />}
							</Button>
						</form>

						<div className="relative">
							<Separator />
							<span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
								Or continue with
							</span>
						</div>

						<Button variant="outline" className="border-2 w-full" onClick={() => signIn('google')}>
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
