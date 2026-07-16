import * as React from "react";
import type {
	ControllerProps,
	FieldPath,
	FieldValues,
} from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

export const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

export function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
}

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
	extends ControllerProps<TFieldValues, TName> {}

export function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: FormFieldProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
}

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

export function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div data-slot="form-item" className={cn("space-y-1.5", className)} {...props} />
		</FormItemContext.Provider>
	);
}

export interface FormLabelProps extends React.ComponentProps<typeof Label> {}	

export function FormLabel({ className, ...props }: FormLabelProps) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			className={cn(error && "text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

export interface FormControlProps extends React.ComponentProps<"div"> {}

export function FormControl({ ...props }: FormControlProps) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

	return (
		<div
			id={formItemId}
			aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

export interface FormDescriptionProps extends React.ComponentProps<"p"> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export interface FormMessageProps extends React.ComponentProps<"p"> {}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
}

