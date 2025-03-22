import { ChangeEvent, useContext } from 'react';
import StrainContext from '../../../contexts/StrainContext';

export default function useStrainDay() {
	const { strain, setStrain } = useContext(StrainContext);

	function onDayChange(event: ChangeEvent<HTMLInputElement>) {
		setStrain({ ...strain, day: event.target.value });
	}
	return { onDayChange };
}
