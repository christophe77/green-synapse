"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SynError;
function SynError({ error }) {
    return (<div style={{ marginTop: '1rem', color: '#EF4444' }}>
			{error && <p style={{ marginTop: '1rem', color: '#EF4444' }}>{error}</p>}
		</div>);
}
