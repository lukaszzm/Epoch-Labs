import { ArrowLeftIcon } from "@phosphor-icons/react";
import { type LinkProps, useNavigate, useRouter } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface BackButtonProps extends Omit<ButtonProps, "onClick"> {
	fallbackTo: LinkProps["to"];
}

export function BackButton({ fallbackTo, children, ...props }: BackButtonProps) {
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
