import useAiData from './useAiData';
import styles from './AiData.module.css';

export default function AiData() {
	const { isPending, aiResponse } = useAiData();
	return (
		<div className={styles.aiDataContainer}>
			<div>Ai data</div>
			<div>{isPending}</div>
			<div>{aiResponse}</div>
		</div>
	);
}
