import { ImageBrokenIcon } from "@phosphor-icons/react";
import type { ImageProps } from "@unpic/react";
import { Image } from "@unpic/react";
import { useState } from "react";

export function ProductImage({ src, alt, ...props }: ImageProps) {
	const [isError, setIsError] = useState(false);

	if (isError) {
		return (
			<div
				role="img"
				aria-label="Product image unavailable"
				className="flex items-center justify-center bg-muted text-muted-foreground size-full"
			>
				<ImageBrokenIcon size={48} weight="thin" />
			</div>
		);
	}

	return (
		<Image src={src} alt={alt ?? ""} layout="constrained" loading="lazy" onError={() => setIsError(true)} {...props} />
	);
}
