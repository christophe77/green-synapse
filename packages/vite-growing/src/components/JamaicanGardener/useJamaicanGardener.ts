import { useContext } from 'react';
import StrainContext from '../../contexts/StrainContext';

export default function useJamaicanGardener() {
	const { strain } = useContext(StrainContext);

	return { strain };
}
