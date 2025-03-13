import { createCompletion, InferenceModel, loadModel } from 'gpt4all';

let model: InferenceModel;
let chat: any;

const loadGPTModel = async () => {
	try {
		model = await loadModel('Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf', {
			verbose: true,
			device: 'cpu',
			nCtx: 2048,
		});
  
		chat = await model.createChatSession({
			temperature: 0.8,
			systemPrompt: '### System:\nYou are a cannabis expert called Syn.\n\n',
		});

		console.log('Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf successfully loaded');
	} catch (error) {
		console.error('Error loading model :', error);
	}
};
loadGPTModel();

export const generateResponse = async (question: string): Promise<string> => {
	if (!model || !chat) throw new Error("Model is not loaded yet.");

	const response = await createCompletion(chat, question);
	return response.choices[0].message.content;
};

export const generateSuggestion = async (question: string): Promise<string> => {
	if (!model || !chat) throw new Error("Model is not loaded yet.");

	const suggestionPrompt = `As a cannabis expert, make a usefull suggestion or advice in relation with : "${question}"`;
	const suggestionResponse = await createCompletion(chat, suggestionPrompt);

	return suggestionResponse.choices[0].message.content;
};
