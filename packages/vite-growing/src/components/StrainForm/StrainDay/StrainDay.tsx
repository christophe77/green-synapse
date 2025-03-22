import useStrainDay from './useStrainDay';
import styles from './StrainDay.module.css';

export default function StrainDay() {
	const { onDayChange } = useStrainDay();
	return (
		<input type="text" className={styles.input} placeholder="Age in days" onChange={onDayChange}/>
	);
}
