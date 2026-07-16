import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CheckoutFormValues } from "@/features/checkout/schemas/checkout-schema";

export function CheckoutShippingAddress() {
	const { control } = useFormContext<CheckoutFormValues>();

	return (
		<div className="space-y-4">
			<h2 className="mb-4 text-lg font-medium">Shipping Address</h2>
			<FormField
				control={control}
				name="fullName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Full Name</FormLabel>
						<FormControl>
							<Input placeholder="Jane Doe" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="line1"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Address Line 1</FormLabel>
						<FormControl>
							<Input placeholder="123 Main St" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="line2"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Address Line 2 <span className="text-muted-foreground font-normal">(optional)</span>
						</FormLabel>
						<FormControl>
							<Input placeholder="Apt, suite, unit…" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-2 gap-4">
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="New York" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								State <span className="text-muted-foreground font-normal">(optional)</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="NY" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<FormField
					control={control}
					name="postalCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Postal Code</FormLabel>
							<FormControl>
								<Input placeholder="10001" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input placeholder="US" maxLength={2} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={control}
				name="phone"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Phone <span className="text-muted-foreground font-normal">(optional)</span>
						</FormLabel>
						<FormControl>
							<Input type="tel" placeholder="+1 555 000 0000" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{/* {error && <p className="text-sm font-medium text-destructive">{error.message}</p>} */}
		</div>
	);
}
