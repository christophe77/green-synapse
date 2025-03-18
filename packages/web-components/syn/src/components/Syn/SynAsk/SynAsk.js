"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SynAsk;
function SynAsk({ question, setQuestion, askQuestion, loading, over18, setOver18, }) {
    return (<>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<input type="text" value={question} onChange={(changeEvent) => setQuestion(changeEvent.target.value)} placeholder="Ask a question..." style={{
            padding: '0.5rem',
            borderRadius: '0.75rem',
            borderWidth: '1px',
            width: '100%',
            color: '#ffffff',
            backgroundColor: '#374151',
        }}/>
				<button onClick={askQuestion} disabled={loading || !over18} style={{
            paddingTop: ' 0.5rem',
            paddingBottom: '0.5rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            borderRadius: '0.75rem',
            color: '#000000',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '300ms',
        }}>
					{loading ? '🌱 Loading...' : 'Ask'}
				</button>
			</div>
		
				<label style={{ display: 'flex', gap: '1rem', color: 'white', }}>
					<input checked={over18} onChange={() => setOver18(!over18)} type="checkbox"/>
					<span>I am over 18</span>
				</label>
		
		</>);
}
