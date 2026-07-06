import { useNavigate, useSearch } from "@tanstack/react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_LABELS } from "@/features/categories/config/sort-labels";
import { SORT_OPTIONS, type SortOption } from "@/features/categories/config/sort-options";

export function CategorySort() {
	const { sort } = useSearch({ from: "/_storefront/categories/$" });
	const navigate = useNavigate({ from: "/categories/$" });

	function handleSortChange(value: SortOption) {
		navigate({ search: (prev) => ({ ...prev, sort: value, page: 1 }) });
	}

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground whitespace-nowrap">Sort by</span>
			<Select value={sort} onValueChange={handleSortChange}>
				<SelectTrigger className="w-44">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SORT_OPTIONS.map((option) => (
						<SelectItem key={option} value={option}>
							{SORT_LABELS[option]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
