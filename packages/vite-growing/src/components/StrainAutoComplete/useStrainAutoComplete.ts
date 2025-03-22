import { useState, useCallback, useEffect } from 'react';

// Custom hook for autocomplete with debounce
export default function useStrainAutoComplete() {
  const [query, setQuery] = useState<string>(''); // Query state for the input field
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]); // Autocomplete results
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for fetching results

  // Use debounce to delay API call until the user stops typing for a short period
  const debounceFetch = useCallback(
    (strainNameChunk: string, limit: number = 10) => {
      const timeoutId = setTimeout(() => {
        fetchStrainAutocomplete(strainNameChunk, limit); // Call fetch when debounce delay ends
      }, 300); // 300ms delay for debounce

      return () => clearTimeout(timeoutId); // Clean up the timeout if the input changes
    },
    []
  );

  // Fetch autocomplete results
  const fetchStrainAutocomplete = async (strainNameChunk: string, limit: number = 10) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/strain/autocomplete?limit=${limit}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ strainNameChunk }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.strains.length === 0) {
        setAutoCompleteResult([]); // No strains found
        console.log('No strains found!');
      } else {
        setAutoCompleteResult(
          data.strains.map((strain: { name: string }) => strain.name) // Extract only the names
        );
      }
    } catch (error) {
      console.error('Failed to fetch strains:', error);
      setAutoCompleteResult([]); // Clear results on error
    } finally {
      setIsLoading(false); // Set loading to false once fetch is done
    }
  };

  // Handle changes in the input field
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.length > 1) {
      debounceFetch(newQuery); // Trigger fetch with debounce
    } else {
      setAutoCompleteResult([]); // Clear results if query is too short
    }
  };

  // Handle a click on a suggestion
  const handleSuggestionClick = (strain: string) => {
    setQuery(strain); // Update input with the selected suggestion
    setAutoCompleteResult([]); // Optionally clear suggestions
  };

  // Triggering debounce effect when query changes
  useEffect(() => {
    return debounceFetch(query);
  }, [query, debounceFetch]);

  return {
    query,
    autoCompleteResult,
    handleQueryChange,
    handleSuggestionClick,
    isLoading, // Expose loading state to show a loading spinner if needed
  };
}
