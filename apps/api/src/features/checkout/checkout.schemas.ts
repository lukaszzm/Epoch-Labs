import { z } from "zod";

const shippingAddressSchema = z.object({
	fullName: z.string().min(1),
	line1: z.string().min(1),
	line2: z.string().optional(),
	city: z.string().min(1),
	state: z.string().optional(),
	postalCode: z.string().min(1),
	country: z.string().length(2),
	phone: z.string().optional(),
});

export const checkoutBodySchema = z.object({
	sessionId: z.string().min(1),
	shippingAddress: shippingAddressSchema.optional(),
	currency: z.string().length(3).default("USD"),
});
