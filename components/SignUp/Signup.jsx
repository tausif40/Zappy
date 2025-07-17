// Modified Signup component using React Hook Form + Zod

"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Gift, Store, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { registerSchema } from "@/schema/userSchema"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/features/auth-slice"
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from "next/navigation"
import OTPVerification from "./OTPVerification"

export default function Signup() {
	const { toast } = useToast();
	const dispatch = useDispatch();
	const route = useRouter();
	const [ showPassword, setShowPassword ] = useState(false)
	const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(false)
	const [ isOtpVerify, setIsOtpVerify ] = useState(false)
	const [ otpVerifyPopup, setOtpVerifyPopup ] = useState(false);

	const { data: session, status } = useSession();
	console.log(session, status);

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			mobile: "",
			password: "",
			confirmPassword: "",
			agreeToTerms: false,
		},
	})

	const mobileNum = watch("mobile");


	useEffect(() => {
		if (isOtpVerify) {
			route.push("/dashboard");
		}
	}, [ isOtpVerify ])

	const onSubmit = async (data) => {
		console.log("Submit: ", data)
		const { confirmPassword, ...payload } = data
		console.log("Submit: ", payload)
		try {
			setIsLoading(true)
			const res = await dispatch(registerUser(payload)).unwrap();
			console.log(res);
			if (res.status === 201) {
				setOtpVerifyPopup(true);
				toast({ variant: "success", title: "Account Created!", description: "Welcome to Zappy. Please check your email to verify your account." });
			} else {
				throw new Error(res.data.message || "Login failed. Please try again.");
			}
			// toast({ variant: "success", title: "Account Created!", description: "Welcome to Zappy. Please check your email to verify your account." });
		} catch (error) {
			console.log("Error in registration: ", error)
			toast({
				variant: "destructive",
				title: "Registration failed!",
				description: error?.message || "Something went wrong. Please try again.",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{otpVerifyPopup &&
				<OTPVerification
					role='user'
					number={mobileNum}
					open={setOtpVerifyPopup}
					isOtpVerify={setIsOtpVerify} />
			}
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
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

							<div className="space-y-1">
								<label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
								<div className="relative">
									<User className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										{...register("firstName")}
										placeholder="first name"
										className="pl-10 border-2 focus:border-purple-500" />
									{errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
								</div>
							</div>

							<div className="space-y-1">
								<label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
								<div className="relative">
									<User className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										{...register("lastName")}
										placeholder="last name"
										className="pl-10 border-2 focus:border-purple-500" />
									{errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
								</div>
							</div>
						</div>

						<div className="space-y-1">
							<label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
							<div className="relative">
								<Mail className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									{...register("email")}
									placeholder="example@gmail.com"
									className="pl-10 border-2 focus:border-purple-500" />
								{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
							</div>
						</div>

						<div className="space-y-1">
							<label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
							<div className="relative">
								<Phone className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									{...register("mobile")}
									type="tel"
									placeholder="+91 98765 43***"
									className="pl-10 border-2 focus:border-purple-500"
								/>
								{errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
							</div>
						</div>

						<div className="space-y-1">
							<label className="text-sm font-medium">Password <span className="text-red-500">*</span></label>
							<div className="relative">
								<Lock className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									{...register("password")}
									type={showPassword ? "text" : "password"}
									placeholder="Create a strong password"
									className="pl-10 pr-10 border-2 focus:border-purple-500" />
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-5 -translate-y-1/2 text-muted-foreground hover:text-foreground">
									{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
								{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
							</div>
						</div>

						<div className="space-y-1">
							<label className="text-sm font-medium">Confirm Password <span className="text-red-500">*</span></label>
							<div className="relative">
								<Lock className="absolute left-3 top-5 -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									{...register("confirmPassword")}
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm your password"
									className="pl-10 pr-10 border-2 focus:border-purple-500"
								/> 
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-5 -translate-y-1/2 text-muted-foreground   hover:text-foreground">
									{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
								{errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Controller
								name="agreeToTerms"
								control={control}
								render={({ field }) => (<Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />)}
							/>
							<label htmlFor="terms" className="text-sm">
								I agree to the <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
							</label>
						</div>
						{errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>}

						<Button type="submit" variant="highlight" className="w-full text-white" disabled={isLoading}>
							Create Account
							{isLoading ? <LoaderCircle className='animate-spin h-5 w-5 ml-2' /> : <ArrowRight className="ml-2 h-4 w-4" />}
						</Button>
					</form>

					<div className="relative">
						<Separator />
						<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
							Or sign up with
						</span>
					</div>

					<Button variant="outline" className="border-2 w-full" onClick={() => signIn('google')}>
						<img src="/img/google.png" alt="" className="w-6" />
						<p className="text-muted-foreground">Continue with Google</p>
					</Button>

					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							Already have an account? <Link href="/auth/login" className="text-purple-600 hover:underline font-medium">Sign in here</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</>
	)
}
