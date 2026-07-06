import type { SortOption } from "@/features/categories/config/sort-options";

export const SORT_LABELS = {
	featured: "Featured",
	price_asc: "Price: Low to High",
	price_desc: "Price: High to Low",
	newest: "Newest",
	rating_desc: "Top Rated",
} as const satisfies Record<SortOption, string>;
