import SynContainer from './SynContainer/SynContainer';
import SynHeader from './SynHeader/SynHeader';
import useSyn from './useSyn';
import SynConversation from './SynConversation/SynConversation';
import SynAsk from './SynAsk/SynAsk';
import SynError from './SynError/SynError';

export default function Syn() {
	const {
		messages,
		isPending,
		error,
		askQuestion,
		question,
		setQuestion,
		over18,
		setOver18,
	} = useSyn();

	return (
		<SynContainer>
			<SynHeader />
			<SynConversation messages={messages} />
			<SynAsk
				loading={isPending}
				askQuestion={askQuestion}
				question={question}
				setQuestion={setQuestion}
				over18={over18}
				setOver18={setOver18}
			/>
			<SynError error={error} />
		</SynContainer>
	);
}
