import { motion } from 'framer-motion';
import Markdown from 'react-markdown';

interface ISynConversationProps {
	messages: { role: string; content: string | { response: string } }[];
}
export default function SynConversation({
	messages,
}: Readonly<ISynConversationProps>) {
	return (
		<div
			style={{
				overflowY: 'auto',
				padding: '1rem',
				marginBottom: '1rem',
				borderRadius: '0.75rem',
				borderWidth: '1px',
				minHeight:'30vh',
				backgroundColor: '#1f2937',
			}}
		>
			{messages.map((message, index) => (
				<motion.div
					key={`${index}-${message.role}`}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ type: 'spring', stiffness: 50 }}
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						gap: '0.5rem',
						padding: '1rem',
						marginBottom: '0.75rem',
						borderRadius: '1rem',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
						backgroundColor:
							message.role === 'assistant' ? '#047857' : '#374151',
						color: 'white',
						maxWidth: '80%',
						marginLeft: message.role === 'assistant' ? '0' : 'auto',
					}}
				>
					<span style={{ fontSize: '1.25rem' }}>
						{message.role === 'assistant' ? '🌿' : '🧍'}
					</span>
					<div>
						<strong style={{ display: 'block', marginBottom: '0.25rem' }}>
							{message.role === 'assistant' ? 'Syn:' : 'You:'}
						</strong>
						<div>
							{message.role === 'assistant' &&
							typeof message.content === 'object' &&
							'response' in message.content ? (
								<Markdown>{message.content.response}</Markdown>
							) : (
								<>{message.content}</>
							)}
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
