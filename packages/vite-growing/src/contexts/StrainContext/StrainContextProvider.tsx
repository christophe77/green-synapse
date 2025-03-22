import { useState, ReactNode, useMemo } from 'react';
import StrainContext, { Strain, StrainContextType } from '.';

type Props = { children: ReactNode };

export default function StrainContextProvider({ children }: Readonly<Props>) {
	const [strain, setStrain] = useState<Strain>({
		name: '',
		day: '1',
		advice: '',
	});

	const context = useMemo<StrainContextType>(() => ({ setStrain, strain }), [strain, setStrain]);

	return (
		<StrainContext.Provider value={context}>{children}</StrainContext.Provider>
	);
}
