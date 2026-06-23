interface FormatCurrencyOptions {
	currency?: string;
	locale?: string;
}

export function formatCurrency(valueInCents: number, options: FormatCurrencyOptions = {}): string {
	const { currency = "USD", locale = "en-US" } = options;

	const value = valueInCents / 100;

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(value);
}
