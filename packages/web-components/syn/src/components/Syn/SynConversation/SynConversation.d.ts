interface ISynConversationProps {
    messages: {
        role: string;
        content: string | {
            response: string;
        };
    }[];
}
export default function SynConversation({ messages, }: Readonly<ISynConversationProps>): import("react").JSX.Element;
export {};
