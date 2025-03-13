import { motion } from 'framer-motion';

export default function Header() {
	return (
		<div className="bg-gray-900 p-2 rounded-2xl shadow-lg">
			<div className="flex items-center justify-around">
				
				
				<div className="max-w-lg">
					<motion.h1
						className="text-4xl font-bold text-center text-emerald-400 mb-4"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Green Synapse AI
					</motion.h1>
					<motion.p
						className="text-center text-xl text-gray-400"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Your Cannabis Genius, always Connected and up to date with latest cannabis sciences data and facts.
					</motion.p>
				</div>
				<img
					src="/images/green-synapse.webp"
					alt="Green Synapse ai Syn"
					className="w-1/6 rounded-xl shadow-lg p-5"
				/>
			</div>
		</div>
	);
}
