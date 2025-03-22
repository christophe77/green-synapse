import { useContext, useTransition } from 'react';
import { shared } from '@green-synapse/shared';
import StrainContext from '../../contexts/StrainContext';

export default function useStrainForm() {
	const { strain, setStrain } = useContext(StrainContext);
	const [isPending, startTransition] = useTransition();

	async function sendDataToJamaicanGardener() {
		startTransition(async () => {
			const question = `I'm currently growing a ${strain.name} cannabis strain from zamnesia or rqs I don't remember.
			I'm currently at day ${strain.day} after seed germination.
			 Can you give me an advice for today? What do I have to do or to chack especially this day?
			 Please don't ask me question I can't answer.`;
			const response = await fetch(
				`${shared.config.default.apiUrl}/api/growing-advice`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ question }),
				},
			);

			const data = await response.json();
			setStrain({ ...strain, advice: data.response });
		});
	}

	return { sendDataToJamaicanGardener, isPending, strain };
}
