import { z } from "zod";

export const businessSchema = z.object({
	businessName: z.string().min(1, "Business name is required"),
	businessType: z.string().min(1, "Business type is required"),
	experience: z.string().min(1, "Experience is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zip: z.string().min(1, "Zip code is required"),
	address: z.string().optional(),
	description: z.string().min(1, "Description is required")
});

export const servicesSchema = z.object({
	services: z.array(z.string()).nonempty("Please select at least one service"),
	agreeToTerms: z.literal(true, {
		errorMap: () => ({
			message: "You must agree to the Terms of Service and Privacy Policy."
		})
	}),
	agreeToBackground: z.literal(true, {
		errorMap: () => ({
			message: "You must consent to background verification."
		})
	})
});
