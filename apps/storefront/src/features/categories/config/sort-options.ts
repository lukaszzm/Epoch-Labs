export const SORT_OPTIONS = ["featured", "price_asc", "price_desc", "newest", "rating_desc"] as const;

export const DEFAULT_SORT_OPTION = "featured" as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
