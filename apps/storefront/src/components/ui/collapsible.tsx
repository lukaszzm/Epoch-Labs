import { Collapsible as CollapsiblePrimitive } from "radix-ui";

export interface CollapsibleProps extends React.ComponentProps<typeof CollapsiblePrimitive.Root> {}

export function Collapsible(props: CollapsibleProps) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export interface CollapsibleTriggerProps extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> {}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
	return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

export interface CollapsibleContentProps extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> {}

export function CollapsibleContent(props: CollapsibleContentProps) {
	return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />;
}
