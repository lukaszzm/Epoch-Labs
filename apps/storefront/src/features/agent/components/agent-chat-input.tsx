import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AgentChatInputProps {
	isStreaming: boolean;
	onSend: (message: string) => void;
}

interface ChatInputValues {
	message: string;
}

export function AgentChatInput({ isStreaming, onSend }: AgentChatInputProps) {
	const { register, handleSubmit, reset, watch } = useForm<ChatInputValues>({
		defaultValues: { message: "" },
	});

	const isEmpty = !watch("message").trim();

	const onSubmit = ({ message }: ChatInputValues) => {
		if (isStreaming) {
			return;
		}

		onSend(message.trim());
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
			<Input
				{...register("message")}
				placeholder="Ask me anything…"
				disabled={isStreaming}
				className="flex-1"
				autoComplete="off"
			/>
			<Button type="submit" size="icon" disabled={isStreaming || isEmpty} aria-label="Send message">
				<PaperPlaneTiltIcon className="size-5" />
			</Button>
		</form>
	);
}
