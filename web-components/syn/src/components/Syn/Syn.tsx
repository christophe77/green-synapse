import { motion } from 'framer-motion';
import useSyn from './useSyn';

export default function Syn() {
	const {
		messages,
		suggestions,
		loading,
		error,
		askQuestion,
		question,
		setQuestion,
	} = useSyn();

	return (
		<div
			style={{
				overflow: 'hidden',
				padding: '1.5rem',
				borderRadius: '1rem',
				backgroundColor: '#064e3b',
				boxShadow:
					'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<img
						src="/images/syn.webp"
						alt="Green Synapse Syn"
						style={{
							padding: '1rem',
							borderRadius: '0.75rem',
							width: '16.666667%',
							boxShadow:
								'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
						}}
					/>
					<div>
						<h2
							style={{
								marginBottom: '1rem',
								fontSize: '2.25rem',
								lineHeight: '2.5rem',
								fontWeight: 700,
								color: '#f9fafb',
							}}
						>
							Ask Syn
						</h2>
						<p style={{ marginBottom: '1rem', color: '#9ca3af' }}>
							<b>Syn</b> is your AI guide with endless knowledge about cannabis
							— from its culture and genetics to its effects and cultivation
							techniques.
						</p>
					</div>
				</div>

				<div
					style={{
						overflowY: 'auto',
						padding: '1rem',
						marginBottom: '1rem',
						borderRadius: '0.75rem',
						borderWidth: '1px',
						height: '16rem',
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
								whiteSpace: 'pre-wrap',
							}}
						>
							<span style={{ fontSize: '1.25rem' }}>
								{message.role === 'assistant' ? '🌿' : '🧍'}
							</span>
							<div>
								<strong style={{ display: 'block', marginBottom: '0.25rem' }}>
									{message.role === 'assistant' ? 'Syn:' : 'You:'}
								</strong>
								<div style={{ lineHeight: '1.5', margin: 0 }}>
									{message.role === 'assistant' &&
									typeof message.content === 'object' &&
									'response' in message.content ? (
										<>{message.content.response}</>
									) : (
										<>{message.content}</>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{suggestions.length > 0 && (
					<div
						style={{
							padding: '1rem',
							marginBottom: '1rem',
							borderRadius: '0.75rem',
							borderWidth: '1px',
							borderColor: '#D97706',
							backgroundColor: '#78350F',
							boxShadow:
								'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
						}}
					>
						<h3
							style={{
								color: '#F9FAFB',
								marginBottom: '0.5rem',
								fontWeight: 700,
							}}
						>
							💡 Suggestion from Syn:
						</h3>
						{suggestions.map((suggestion, index) => (
							<motion.div
								key={`${index}-${suggestion.content}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								style={{ color: '#FCD34D', cursor: 'pointer' }}
								onClick={() => setQuestion(suggestion.content)}
							>
								{suggestion.content}
							</motion.div>
						))}
					</div>
				)}

				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<input
						type="text"
						value={question}
						onChange={(changeEvent) => setQuestion(changeEvent.target.value)}
						placeholder="Ask a question..."
						style={{
							padding: '0.5rem',
							borderRadius: '0.75rem',
							borderWidth: '1px',
							width: '100%',
							color: '#ffffff',
							backgroundColor: '#374151',
						}}
					/>
					<button
						onClick={askQuestion}
						disabled={loading}
						style={{
							paddingTop: ' 0.5rem',
							paddingBottom: '0.5rem',
							paddingLeft: '1rem',
							paddingRight: '1rem',
							borderRadius: '0.75rem',
							color: '#000000',
							transitionProperty: 'all',
							transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
							transitionDuration: '300ms',
						}}
					>
						{loading ? '🌱 Loading...' : 'Ask'}
					</button>
				</div>

				{error && (
					<p style={{ marginTop: '1rem', color: '#EF4444' }}>{error}</p>
				)}
			</motion.div>
		</div>
	);
}
