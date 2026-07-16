import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { AppRoute } from "@/config/app-routes";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";
import { useCheckout } from "@/features/checkout/hooks/use-checkout";
import { type CheckoutFormValues, checkoutSchema } from "@/features/checkout/schemas/checkout-schema";

interface CheckoutFormProps extends React.PropsWithChildren {}

export function CheckoutForm({ children }: CheckoutFormProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutateAsync: checkoutAsync } = useCheckout();

	const form = useForm<CheckoutFormValues>({
		resolver: standardSchemaResolver(checkoutSchema),
		defaultValues: {
			fullName: "",
			line1: "",
			line2: "",
			city: "",
			state: "",
			postalCode: "",
			country: "US",
			phone: "",
		},
	});

	const onSubmit = async (values: CheckoutFormValues) => {
		await checkoutAsync(values)
			.then((order) => {
				queryClient.invalidateQueries({ queryKey: cartQueryKey(getOrCreateSessionId()) });
				navigate({ to: AppRoute.ORDER_CONFIRMATION, params: { id: order.id } });
			})
			.catch(() => {
				toast.error("Failed to place order. Please try again later.");
			});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
		</Form>
	);
}
