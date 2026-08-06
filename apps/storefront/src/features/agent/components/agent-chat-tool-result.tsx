import { AgentChatAddToCartResult } from "@/features/agent/components/agent-chat-add-to-cart-result";
import { AgentChatGetCartResult } from "@/features/agent/components/agent-chat-get-cart-result";
import { AgentChatProductDetailResult } from "@/features/agent/components/agent-chat-product-detail-result";
import { AgentChatProductListResult } from "@/features/agent/components/agent-chat-product-list-result";
import { AgentChatRemoveFromCartResult } from "@/features/agent/components/agent-chat-remove-from-cart-result";
import { AgentChatStartCheckoutResult } from "@/features/agent/components/agent-chat-start-checkout-result";
import type { ToolResult } from "@/features/agent/types";

interface AgentChatToolResultProps {
	message: ToolResult;
}

export function AgentChatToolResult({ message }: AgentChatToolResultProps) {
	switch (message.toolName) {
		case "getCart":
			return <AgentChatGetCartResult message={message} />;
		case "listProducts":
			return <AgentChatProductListResult message={message} />;
		case "getProductDetail":
			return <AgentChatProductDetailResult message={message} />;
		case "startCheckout":
			return <AgentChatStartCheckoutResult message={message} />;
		case "addToCart":
			return <AgentChatAddToCartResult message={message} />;
		case "removeFromCart":
			return <AgentChatRemoveFromCartResult message={message} />;
	}
}
