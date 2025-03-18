interface SynAskProps {
    question: string;
    setQuestion: (question: string) => void;
    over18: boolean;
    setOver18: (over18: boolean) => void;
    askQuestion: () => Promise<void>;
    loading: boolean;
}
export default function SynAsk({ question, setQuestion, askQuestion, loading, over18, setOver18, }: Readonly<SynAskProps>): import("react").JSX.Element;
export {};
