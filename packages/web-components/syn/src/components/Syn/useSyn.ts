import { useState, useTransition } from 'react';

interface Message {
	role: string;
	content: string | { response: string };
}

export default function useSyn() {
	const [question, setQuestion] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [over18, setOver18] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');

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
			} catch (err) {
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
