import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Button, type ButtonProps } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";

export interface BackButtonProps extends Omit<ButtonProps, "onClick"> {
	fallbackTo?: AppRoute;
}

export function BackButton({ fallbackTo = AppRoute.HOME, children, ...props }: BackButtonProps) {
	const router = useRouter();
	const navigate = useNavigate();

	const handleBack = () => {
		if (router.history.canGoBack()) {
			router.history.back();
		} else {
			navigate({ to: fallbackTo });
		}
	};

	return (
		<Button variant="ghost" size="sm" onClick={handleBack} {...props}>
			{children ?? (
				<Fragment>
					<ArrowLeftIcon />
					Back
				</Fragment>
			)}
		</Button>
	);
}
