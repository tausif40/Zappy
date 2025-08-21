import { z } from "zod";

export const registerSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email"),
		mobile: z.string().nonempty("Phone number is required").min(10, "Enter a valid 10-digit number"),
		password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
		agreeToTerms: z.literal(true, {
			errorMap: () => ({ message: "You must agree to the Terms and Privacy Policy." }),
		}),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "Passwords do not match",
			});
		}
	});

export const loginSchema = z.object({
	mobile: z.string().nonempty("Phone number is required").min(10, "Number must be 10 digits"),
	password: z.string().nonempty("Password is required")
});

export const addressSchema = z.object({
	street: z.string().optional(),
	address: z.string().min(1, "Address is required"),
	landMark: z.string().optional(),
	name: z.string().min(1, "Name is required"),
	mobile: z
		.string()
		.regex(/^\d+$/, "Mobile must be a number")
		.optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	pincode: z
		.string()
		.regex(/^\d{6}$/, "Pincode must be 6 digits"),
	addressType: z.string().min(1, "Address type is required"),
	gstin: z.string().optional(),
	companyName: z.string().optional(),
})