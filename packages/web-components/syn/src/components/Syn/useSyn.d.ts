interface Message {
    role: string;
    content: string | {
        response: string;
    };
}
export default function useSyn(): {
    messages: Message[];
    isPending: boolean;
    error: string;
    askQuestion: () => Promise<void>;
    setQuestion: import("react").Dispatch<import("react").SetStateAction<string>>;
    question: string;
    over18: boolean;
    setOver18: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export {};
