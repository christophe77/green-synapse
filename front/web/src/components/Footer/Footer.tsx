import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-center text-white">
          <motion.h2
            className="text-2xl font-bold text-emerald-400 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Green Synapse
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Is proudely powered by Zamnesia.com for cannabis enthusiasts.
          </motion.p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</a>
            <a href="#" className="text-emerald-400 hover:text-emerald-300">Terms of Service</a>
            <a href="#" className="text-emerald-400 hover:text-emerald-300">Contact</a>
          </div>
        </div>
        <img
          src="/images/zamnesia.jpg"
          alt="Zamnesia Logo"
          className="w-1/5 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
