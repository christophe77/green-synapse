import styles from './JamaicanGardenerAvatar.module.css';
import GardenerAvatarImg from './JamaicanGardenerAvatar.svg';

export default function JamaicanGardenerAvatar() {
	return (
		<div className={styles.jamaicanGardenerAvatarContainer}>
			<img
				src={GardenerAvatarImg}
				alt="Jamaican Gardener Avatar"
				width="100"
				height="100"
			/>
		</div>
	);
}
