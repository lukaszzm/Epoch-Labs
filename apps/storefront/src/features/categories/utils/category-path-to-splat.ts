export function categoryPathToSplat(path: string): string {
	return path.startsWith("/") ? path.slice(1) : path;
}
