interface ISynErrorProps {
	error: string;
}
export default function SynError({ error }: Readonly<ISynErrorProps>) {
	return (
		<div style={{ marginTop: '1rem', color: '#EF4444' }}>
			{error && <p style={{ marginTop: '1rem', color: '#EF4444' }}>{error}</p>}
		</div>
	);
}
