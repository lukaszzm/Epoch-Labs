import z from "zod";

export const checkoutSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	line1: z.string().min(1, "Address is required"),
	line2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().optional(),
	postalCode: z.string().min(1, "Postal code is required"),
	country: z.string().length(2, "Country must be a 2-letter code"),
	phone: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
