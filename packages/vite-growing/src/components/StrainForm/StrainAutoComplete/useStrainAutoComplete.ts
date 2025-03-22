import { useState, useEffect, useContext } from 'react';
import StrainContext from '../../../contexts/StrainContext';

export default function useStrainAutoComplete() {
	const { strain, setStrain } = useContext(StrainContext);

	const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

	const fetchStrainAutocomplete = async (
		strainNameChunk: string,
		limit: number = 10,
	) => {
		if (!strainNameChunk.trim()) return; // Don't fetch if query is empty or only spaces

		try {
			setIsLoading(true);
			const response = await fetch(
				`http://localhost:3000/api/strain/autocomplete?limit=${limit}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ strainNameChunk }),
				},
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			setAutoCompleteResult(
				data.strains.map((strain: { name: string }) => strain.name),
			);
		} catch (error) {
			console.error('Failed to fetch strains:', error);
			setAutoCompleteResult([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newStrainName = event.target.value;
		setStrain({ ...strain, name: newStrainName });

		if (debounceTimeout) clearTimeout(debounceTimeout);

		if (newStrainName.length > 1) {
			const timeoutId = window.setTimeout(() => {
				fetchStrainAutocomplete(newStrainName);
			}, 300);
			setDebounceTimeout(timeoutId);
		} else {
			setAutoCompleteResult([]);
		}
	};

	const handleSuggestionClick = (strainName: string) => {
		setStrain({ ...strain, name: strainName });
		setAutoCompleteResult([]);
	};

	// Cleanup any pending timeout when the component unmounts
	useEffect(() => {
		return () => {
			if (debounceTimeout) clearTimeout(debounceTimeout);
		};
	}, [debounceTimeout]);

	return {
		strain,
		autoCompleteResult,
		handleQueryChange,
		handleSuggestionClick,
		isLoading,
	};
}
