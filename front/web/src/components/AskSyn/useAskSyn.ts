import { useState } from 'react';

interface Message {
    role: string;
    content: string;
}

interface Suggestion {
    content: string;
}

export default function useAskSyn() {
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
            const res = await fetch('http://localhost:4891/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!res.ok) {
                throw new Error("Erreur de communication avec l'API");
            }

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
            setError(`Erreur lors de la communication avec l'IA. ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return { messages, suggestions, loading, error, askQuestion, setQuestion, question };
}
