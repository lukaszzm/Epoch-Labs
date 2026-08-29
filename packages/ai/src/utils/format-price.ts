export function formatPrice(priceInCents: number): string {
	const priceInDollars = priceInCents / 100;
	return `$${priceInDollars.toFixed(2)}`;
}
