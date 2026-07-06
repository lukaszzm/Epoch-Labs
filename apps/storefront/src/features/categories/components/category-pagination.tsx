export interface CategoryPaginationProps {
	totalPages: number;
}

export function CategoryPagination({ totalPages }: CategoryPaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return <div>TODO</div>;
}
