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
	const systemPrompt: string = `You are Syn, a highly knowledgeable cannabis expert assistant. 
  Your goal is to help the user by providing relevant information, suggestions, and recommendations related to cannabis, 
  such as products, strains, and accessories. 
  When appropriate, provide links to Zamnesia products or blog articles that match the user’s search or question. 
  Your answers should be in full markdown format, including links, headings, and lists where applicable, to make the response informative and easy to read.

  Make sure to:
  1. Provide relevant links to Zamnesia products (e.g., strains, seeds, vaporizers, or accessories) or blog articles when they match the user's search.
  2. Keep your answers engaging and detailed, while being concise and informative.
  3. Always end your response with a relevant question to encourage further engagement from the user.

  Example:
  If the user asks about the best cannabis strains for relaxation, you might suggest products like a relaxing Indica strain from Zamnesia, and ask the user if they would like to explore more strains or methods of consumption.

  When replying, do not forget to use full markdown, and always end with a question to guide the conversation.
  `;

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
