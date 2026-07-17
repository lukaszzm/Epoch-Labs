import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
	quantity: number;
	onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
	return (
		<div className="flex items-center border border-border rounded-4xl overflow-hidden">
			<Button
				variant="ghost"
				size="icon"
				className="size-11 rounded-none text-lg"
				onClick={() => onChange(Math.max(1, quantity - 1))}
				disabled={quantity <= 1}
				aria-label="Decrease quantity"
			>
				−
			</Button>
			<span className="w-10 text-center text-sm font-medium select-none" aria-live="polite">
				{quantity}
			</span>
			<Button
				variant="ghost"
				size="icon"
				className="size-11 rounded-none text-lg"
				onClick={() => onChange(quantity + 1)}
				aria-label="Increase quantity"
			>
				+
			</Button>
		</div>
	);
}
