import { createContext, Dispatch, SetStateAction } from 'react';
export type Strain = {
	name: string;
	day: string;
	advice: string;
};
export type StrainContextType = {
	strain: Strain;
	setStrain: Dispatch<SetStateAction<Strain>>;
};

const StrainContext = createContext<StrainContextType>({} as StrainContextType);

export default StrainContext;
