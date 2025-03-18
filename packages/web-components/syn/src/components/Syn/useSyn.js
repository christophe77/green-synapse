"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSyn;
const react_1 = require("react");
function useSyn() {
    const [question, setQuestion] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [over18, setOver18] = (0, react_1.useState)(false);
    const [isPending, startTransition] = (0, react_1.useTransition)();
    const [error, setError] = (0, react_1.useState)('');
    const askQuestion = async () => {
        startTransition(async () => {
            setError('');
            const updatedMessages = [
                ...messages,
                { role: 'user', content: question },
            ];
            setMessages(updatedMessages);
            try {
                const res = await fetch('http://51.75.124.64:3000/api/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question, messages: updatedMessages }),
                });
                setQuestion('');
                const data = await res.json();
                if (data.response) {
                    setMessages((prev) => [
                        ...prev,
                        { role: 'assistant', content: data.response },
                    ]);
                }
            }
            catch (err) {
                setError(`Error : ${err}`);
            }
        });
    };
    return {
        messages,
        isPending,
        error,
        askQuestion,
        setQuestion,
        question,
        over18,
        setOver18,
    };
}
