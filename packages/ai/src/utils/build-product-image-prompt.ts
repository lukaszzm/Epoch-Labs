export interface ProductImagePromptInput {
	name: string;
	brand: string;
	shortDescription: string;
	agentSummary: string;
}

export function buildProductImagePrompt(product: ProductImagePromptInput): string {
	return `Generate a hyper-realistic, premium e-commerce product image for: ${product.name} by ${product.brand}.
Description: ${product.shortDescription}.
Agent Summary: ${product.agentSummary}.
Style Specifications:
- Background: Pure, seamless, bright white backdrop (infinity cove style) with no visible horizon line or wall corners.
- Lighting: Soft, even, high-key studio lighting. Eliminate all harsh, directional shadows. The lighting should be bright and airy, with only soft, subtle contact shadows directly beneath the items to ground them on the surface.
- Aesthetic: Minimalistic, clean, and modern. Avoid clutter, props, or distracting elements. Focus solely on the product.
Composition and Details:
- Focus: The main product must be perfectly centered, standing upright, front-facing, and in ultra-sharp macro focus. Ensure the product is fully visible and not cropped or cut off.
- Styling: If needed incorporate 1 to 2 highly realistic, minimal props arranged elegantly around the base of the product to reflect its ingredients or texture. Props should be subtle, not overpowering, and should enhance the product's appeal.
- Clarity: The composition must remain mostly empty space (negative space) to draw the eye to the product. Any text on the packaging should be sharp, straight and legible.`;
}
