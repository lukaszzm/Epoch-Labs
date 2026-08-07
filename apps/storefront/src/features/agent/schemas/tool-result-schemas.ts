import { z } from "zod";

const cartItemSchema = z.object({
	id: z.string(),
	quantity: z.number(),
	priceSnapshot: z.number(),
	lineTotalInCents: z.number(),
	variant: z.object({ name: z.string() }),
	product: z.object({ name: z.string(), slug: z.string() }),
});

const agentProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	brand: z.string(),
	shortDescription: z.string(),
	lowestPriceInCents: z.number().nullable(),
	currency: z.string(),
	averageRating: z.number(),
	reviewCount: z.number(),
});

const agentProductVariantSchema = z.object({
	id: z.string(),
	sku: z.string(),
	name: z.string(),
	priceInCents: z.number(),
	compareAtPriceInCents: z.number().nullable(),
	stockQuantity: z.number(),
	isAvailable: z.boolean(),
});

const agentProductDetailSchema = agentProductSchema.extend({
	categoryId: z.string(),
	tags: z.array(z.string()),
	attributes: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])),
	variants: z.array(agentProductVariantSchema),
});

const orderLineItemSchema = z.object({
	variantId: z.string(),
	sku: z.string(),
	variantName: z.string(),
	productName: z.string(),
	brand: z.string(),
	quantity: z.number(),
	priceInCents: z.number(),
	lineTotalInCents: z.number(),
});

const orderDataSchema = z.object({
	id: z.string(),
	status: z.string(),
	totalInCents: z.number(),
	currency: z.string(),
	itemCount: z.number(),
	lineItems: z.array(orderLineItemSchema),
});

export const getCartPayloadSchema = z.object({
	cartId: z.string().nullable(),
	items: z.array(cartItemSchema),
	totalInCents: z.number(),
	currency: z.string(),
	itemCount: z.number(),
});

export const listProductsPayloadSchema = z.object({
	data: z.array(agentProductSchema),
});

export const getProductDetailPayloadSchema = z.object({
	found: z.boolean(),
	product: agentProductDetailSchema,
});

export const startCheckoutPayloadSchema = z.object({
	success: z.boolean(),
	order: orderDataSchema,
});

export const addToCartPayloadSchema = z.object({
	success: z.boolean(),
	added: z.object({
		variantName: z.string(),
		productName: z.string(),
		quantity: z.number(),
		priceInCents: z.number(),
		currency: z.string(),
	}),
});

export const removeFromCartPayloadSchema = z.object({
	success: z.boolean(),
	action: z.enum(["removed", "reduced"]),
	variantName: z.string(),
	productName: z.string(),
	currency: z.string(),
	newQuantity: z.number(),
});
