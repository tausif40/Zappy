import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { registerSchema } from '@/schema/userSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerVendor } from '@/store/vendor/vendorAuth-slice'
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import OTPVerification from "./OTPVerification"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, LoaderCircle } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function PersonalInformation({ currentStep }) {
	const route = useRouter();
	const { toast } = useToast();
	const dispatch = useDispatch();
	const [ otpVerify, setOtpVerify ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false)
	const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

	const { register, handleSubmit, formState: { errors }, } = useForm({
		resolver: zodResolver(registerSchema)
	});
	console.log(errors);
	// onClick = {() => currentStep((prev) => prev + 1)

	// currentStep((prev) => prev + 1)
	const onSubmit = async (data) => {
		const { confirmPassword, ...payload } = data
		console.log("Submit: ", payload)
		try {
			setIsLoading(true)
			const res = await dispatch(registerVendor(payload)).unwrap();
			console.log(res);
			if (res?.statusCode === 400) {
				toast({ variant: "warning", title: "Please verify!", description: "Welcome to Zappy. Please verify your account." });
			}
			if (res.status === 201) {
				// Cookies.set("token", res.data.accessToken);
				// route.push("/vendor/dashboard");
				setOtpVerify(true)
			} else {
				throw new Error(res.data.message || "Login failed. Please try again.");
			}
		} catch (error) {
			console.log("Error in registration: ", error)
			toast({ variant: "destructive", title: "Registration failed!", description: error?.message || "Something went wrong. Please try again." })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{otpVerify && <OTPVerification />}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<h3 className="text-lg font-semibold">Personal Information</h3>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
						<div className="relative">
							<User className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								{...register("firstName")}
								placeholder="First name"
								className="pl-10 border-2 focus:border-purple-500"
							/>
							{errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
						</div>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
						<div className="relative">
							<User className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								{...register("lastName")}
								placeholder="Last name"
								className="pl-10 border-2 focus:border-purple-500"
							/>
							{errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
					<div className="relative">
						<Mail className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							{...register("email")}
							type="email"
							placeholder="example@gmail.com"
							className="pl-10 border-2 focus:border-purple-500"
						/>
						{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
					<div className="relative">
						<Phone className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							{...register("mobile")}
							type='number'
							placeholder="ex- +91 98765 43210"
							className="pl-10 border-2 focus:border-purple-500"
						/>
						{errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Password <span className="text-red-500">*</span></label>
					<div className="relative">
						<Lock className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="Create a strong password"
							className="pl-10 pr-10 border-2 focus:border-purple-500"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-5 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
						{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Confirm Password <span className="text-red-500">*</span></label>
					<div className="relative">
						<Lock className="absolute left-3 top-5 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							{...register("confirmPassword")}
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm your password"
							className="pl-10 pr-10 border-2 focus:border-purple-500"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-5 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
						{errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
					</div>
				</div>

				<div className="flex justify-between pt-6">
					<div></div>

					<Button
						type="submit"
						variant='highlight'
						className="ml-auto text-white"
						disabled={isLoading}
					>
						Next
						{isLoading ? <LoaderCircle className='animate-spin h-5 w-5 ml-2' /> : <ArrowRight className="ml-2 h-4 w-4" />}
					</Button>
				</div>
			</form>
		</>
	)
}

export default PersonalInformation