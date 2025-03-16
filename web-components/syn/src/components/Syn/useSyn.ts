import { useState } from 'react';

interface Message {
    role: string;
    content: string | { response: string };
}

interface Suggestion {
    content: string;
}

export default function useSyn() {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const askQuestion = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setError('');
        
        const newMessages = [...messages, { role: 'user', content: question }];
        setMessages(newMessages);
        setQuestion('');
        setSuggestions([]); // On réinitialise les suggestions avant chaque nouvelle question

        try {
            const res = await fetch('http://localhost:3000/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await res.json();

            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.response },
                ]);
            }

            if (data.suggestion) {
                setSuggestions([{ content: data.suggestion }]);
            }
            
        } catch (err) {
            setError(`Error : ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return { messages, suggestions, loading, error, askQuestion, setQuestion, question };
}
