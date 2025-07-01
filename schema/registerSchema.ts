import { z } from "zod";

export const registerSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email"),
		mobile: z.string().nonempty("Phone number is required").min(10, "Number must be 10 digits"),
		password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: "You must agree to the terms and conditions"
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match"
	});

export const loginSchema = z.object({
	mobile: z.string().nonempty("Phone number is required").min(10, "Number must be 10 digits"),
	password: z.string().nonempty("Password is required")
});
