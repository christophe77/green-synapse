import { mistral } from './index';

export type Message = {
	role: 'system' | 'user' | 'assistant' | 'tool';
	content: string;
};

export default async function ask(
	question: string,
	messages: Message[] = [],
): Promise<
	| {
			response: string | null;
			messages: Message[];
	  }
	| string
> {
	const systemPrompt: string = `You are Syn, a cannabis specialist
									who helps the user by offering relevant suggestions
									and when possible providing links from the zamnesia.com
									store to products related to their search.
									Please answer in full markdown.
									And finish your answer with a question suggestion to improve some part of the initial question.`;

	try {
		// On crée une nouvelle copie de l'historique
		const updatedMessages = [...messages];

		// Si c'est la première interaction, on ajoute le message système
		if (updatedMessages.length === 0) {
			const systemMessage: Message = { role: 'system', content: systemPrompt };
			updatedMessages.push(systemMessage);
		}

		// On ajoute le message utilisateur
		const userMessage: Message = { role: 'user', content: question };
		updatedMessages.push(userMessage);

		// Appel à l'API
		const chatResponse = await mistral.chat.complete({
			model: 'mistral-large-latest',
			messages: updatedMessages,
		});

		if (chatResponse.choices && chatResponse.choices.length > 0) {
			const responseContent = chatResponse.choices[0].message.content;

			if (typeof responseContent === 'string') {
				// On ajoute la réponse de l'assistant à l'historique
				const assistantMessage: Message = {
					role: 'assistant',
					content: responseContent,
				};
				updatedMessages.push(assistantMessage);

				// On retourne l'historique complet mis à jour
				return { response: responseContent, messages: updatedMessages };
			} else {
				return 'AI response is not a string';
			}
		}
		return 'No response from AI';
	} catch (error) {
		return String(error);
	}
}
