export type Message = {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
};
export default function ask(question: string, messages?: Message[]): Promise<{
    response: string | null;
    messages: Message[];
} | string>;
