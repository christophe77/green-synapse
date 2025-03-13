import { motion } from 'framer-motion';
import useAskSyn from './useAskSyn';

export default function AskSyn() {
	const {
		messages,
		suggestions,
		loading,
		error,
		askQuestion,
		question,
		setQuestion,
	} = useAskSyn();

	return (
		<div className="max-h-[600px] overflow-hidden bg-gradient-to-br from-green-900 via-gray-900 to-black p-6 rounded-2xl shadow-lg">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="flex flex-col gap-4"
			>
				<div className="flex items-center justify-around">
					<img
						src="/images/syn.webp"
						alt="Green Synapse Syn"
						className="w-1/6 rounded-xl shadow-lg p-4"
					/>
					<div>
						<h2 className="text-4xl font-bold text-lime-400 mb-4">Ask Syn</h2>
						<p className="text-gray-400 mb-4">
							<b>Syn</b> is your AI guide with endless knowledge about cannabis
							— from its culture and genetics to its effects and cultivation
							techniques.
						</p>
					</div>
				</div>

				<div className="bg-gray-800 p-4 rounded-xl mb-4 overflow-y-auto h-64 border border-lime-600">
					{messages.map((message, index) => (
						<motion.div
							key={`${index}-${message.role}`}
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ type: 'spring', stiffness: 50 }}
							className={`mb-2 p-2 rounded-xl ${
								message.role === 'assistant'
									? 'bg-green-800 text-lime-300'
									: 'bg-gray-700 text-white'
							}`}
						>
							<strong>
								{message.role === 'assistant' ? '🌿 Syn:' : '🧍 You:'}
							</strong>{' '}
							{message.content}
						</motion.div>
					))}
				</div>

				{suggestions.length > 0 && (
					<div className="bg-yellow-900 p-4 rounded-xl mb-4 border border-yellow-600 shadow-lg">
						<h3 className="text-lime-300 font-bold mb-2">
							💡 Suggestion from Syn:
						</h3>
						{suggestions.map((suggestion, index) => (
							<motion.div
								key={`${index}-${suggestion.content}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								className="text-yellow-300 cursor-pointer"
								onClick={() => setQuestion(suggestion.content)}
							>
								{suggestion.content}
							</motion.div>
						))}
					</div>
				)}

				<div className="flex gap-2">
					<input
						type="text"
						value={question}
						onChange={(changeEvent) => setQuestion(changeEvent.target.value)}
						placeholder="Ask a question..."
						className="w-full p-2 rounded-xl text-white bg-gray-700 border border-lime-500 focus:ring focus:ring-lime-400 placeholder-lime-300"
					/>
					<button
						onClick={askQuestion}
						disabled={loading}
						className="bg-lime-500 text-black py-2 px-4 rounded-xl hover:bg-lime-600 transition-all duration-300"
					>
						{loading ? '🌱 Loading...' : 'Ask'}
					</button>
				</div>

				{error && <p className="text-red-500 mt-4">{error}</p>}
			</motion.div>
		</div>
	);
}
