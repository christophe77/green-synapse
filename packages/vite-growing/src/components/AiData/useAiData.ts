import { shared } from '@green-synapse/shared';
import { useState, useEffect, useTransition } from 'react';

export default function useAiData() {
	const [isPending, startTransition] = useTransition();

	const [aiResponse, setAiResponse] = useState<string>('');

	async function getDataFromAiAction(
		messages: {
			role: string;
			content: string;
		}[],
		question: string,
	) {
		try {
			const config = shared.config;
			const response = await fetch(`${config.default.apiUrl}/api/ask`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ question, messages }),
			});

			const data = await response.json();
			setAiResponse(data);
		} catch (error) {
			console.error('Error:', error);
		}
	}
	async function sendMessage() {
		const question =
			'Hi, Syn, I have inside my grow tent 1 20l mixed soil with a cannabis plant strain called Purple Haze Automatic from zamnesia shop. We are on day 23 after germination. The temperature is 30 degres celcius and humidity is 50%. What advices can you give me, based on science studies and online bank seeds informations. ';
		const messages = [{ role: 'user', content: question }];

		startTransition(() => {
			getDataFromAiAction(messages, question);
		});
	}

	useEffect(() => {
		sendMessage();
	}, []);

	return {
		isPending,
		aiResponse,
	};
}
