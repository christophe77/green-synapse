import { mistral } from './index';

async function generateSuggestions(
	response: string,
	count: number,
): Promise<string[]> {
	const suggestions: string[] = [];
	const responseSentences = response.split(/[.!?]\s/);

	for (let i = 0; i < count; i++) {
		const suggestion = responseSentences[i]
			? responseSentences[i].trim() + '?'
			: null;
		if (suggestion) suggestions.push(suggestion);
	}

	return suggestions;
}

export default async function ask(question: string): Promise<
	| {
			response: string | null;
			suggestions: string[] | null;
	  }
	| string
> {
	const messages: {
		role: 'system' | 'user' | 'assistant' | 'tool';
		content: string;
	}[] = [];
	const systemPrompt: string =
		'You are Syn, a cannabis specialist, who helps the user by offering relevant suggestions and when posible providing links from the zamnesia.com or royalqueenseeds.com store to products related to their search.';
	const suggestionsCount: number = 3;

	try {
		const systemMessage = { role: 'system' as const, content: systemPrompt };
		const userMessage = { role: 'user' as const, content: question };

		const completeMessages = [systemMessage, ...messages, userMessage];

		const chatResponse = await mistral.chat.complete({
			model: 'mistral-large-latest',
			messages: completeMessages,
		});

		if (chatResponse.choices && chatResponse.choices.length > 0) {
			const responseContent = chatResponse.choices[0].message.content;

			if (typeof responseContent === 'string') {
				const suggestions = await generateSuggestions(
					responseContent,
					suggestionsCount,
				);

				return { response: responseContent, suggestions };
			} else {
				return 'La réponse de l’IA n’est pas une chaîne de caractères.';
			}
		}
		return 'No response from AI';
	} catch (error) {
		return String(error);
	}
}
