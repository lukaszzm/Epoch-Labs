import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AgentNewChatProps {
	onConfirm: () => void;
}

export function AgentNewChat({ onConfirm }: AgentNewChatProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="lg">New Chat</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="dark">
				<AlertDialogHeader>
					<AlertDialogTitle>New Chat</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to start a new chat? This will clear the current conversation and cart state, and
						cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onConfirm}>
						Start New Chat
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
