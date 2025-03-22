import styles from './LiveData.module.css';

export default function LiveData() {
	return (
		<div className={styles.liveDataContainer}>
			<div>Live data</div>
			<div>
				<ul>
					<li>DAY : 23</li>
					<li>temp ° : 0</li>
					<li>humidity % : 0</li>
				</ul>
			</div>
		</div>
	);
}
