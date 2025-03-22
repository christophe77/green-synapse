import JamaicanGardenerAvatar from './JamaicanGardnerAvatar/JamaicanGardenerAvatar';
import useJamaicanGardener from './useJamaicanGardener';
import styles from './JamaicanGardener.module.css';

export default function JamaicanGardener() {
	const { strain } = useJamaicanGardener();
	return (
		<div className={styles.jamaicanGardenerContainer}>
			<div className={styles.avatarContainer}>
				<JamaicanGardenerAvatar />
			</div>
			<div className={styles.textContainer}>
				{strain?.advice ? (
					<div
						dangerouslySetInnerHTML={{ __html: strain.advice }}
					></div>
				) : (
					"Select a strain, tell me your plant age and I'll give you my advice for you today"
				)}
			</div>
		</div>
	);
}
