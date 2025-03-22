import StrainAutoComplete from '../StrainForm/StrainAutoComplete/StrainAutoComplete';
import StrainDay from './StrainDay/StrainDay';
import useStrainForm from './useStrainForm';
import styles from './StrainForm.module.css';

export default function StrainForm() {
	const { sendDataToJamaicanGardener, isPending, strain } = useStrainForm();
	return (
		<div className={styles.strainFormContainer}>
			<div className={styles.inputLine}>
				<span>Strain name : </span>
				<StrainAutoComplete />
			</div>

			<div className={styles.inputLine}>
				<span>Seed age :</span> <StrainDay />
			</div>

			<div className={styles.buttonContainer}>
				{!isPending && strain.name === '' && `Fill the strain name my friend`}
				{strain.name !== '' && (
					<button
						disabled={isPending}
						onClick={sendDataToJamaicanGardener}
						style={{ cursor: isPending ? 'not-allowed' : 'pointer' }}
					>
						{isPending && 'thinking...'}
						{!isPending && `Give me your science for today !`}
					</button>
				)}
			</div>
		</div>
	);
}
