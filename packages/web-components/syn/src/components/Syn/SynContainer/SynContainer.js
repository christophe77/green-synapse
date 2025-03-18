"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SynContainer;
const framer_motion_1 = require("framer-motion");
function SynContainer({ children, }) {
    return (<div style={{
            margin: '20px',
            overflow: 'hidden',
            fontFamily: 'Montserrat',
            padding: '1.5rem',
            borderRadius: '1rem',
            backgroundColor: '#064e3b',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}>
			<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				{children}
			</framer_motion_1.motion.div>
		</div>);
}
