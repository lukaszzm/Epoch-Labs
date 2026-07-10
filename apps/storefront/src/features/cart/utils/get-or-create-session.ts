import { SESSION_KEY } from "@/features/cart/config/constants";

export function getOrCreateSessionId(): string {
	if (typeof window === "undefined") {
		return "";
	}

	let id = localStorage.getItem(SESSION_KEY);

	if (!id) {
		id = crypto.randomUUID();
		localStorage.setItem(SESSION_KEY, id);
	}

	return id;
}
