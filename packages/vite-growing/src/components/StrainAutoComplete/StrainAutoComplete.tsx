import useStrainAutoComplete from './useStrainAutoComplete';
import styles from './StrainAutoComplete.module.css';

export default function StrainAutoComplete() {
	const {
		query,
		autoCompleteResult,
		handleQueryChange,
		handleSuggestionClick,
		isLoading,
	} = useStrainAutoComplete();

	return (
		<div className={styles.strainAutoCompleteContainer}>
			<input
				type="text"
				value={query}
				onChange={handleQueryChange}
				placeholder="Search for strains"
			/>
			{isLoading && <p>Loading...</p>}
			{autoCompleteResult.length > 0 && (
				<ul className={styles.suggestions}>
					{autoCompleteResult.map((strain, index) => (
						<li key={`${strain}-${index}`}>
							<button
								type="button"
								onClick={() => handleSuggestionClick(strain)}
							>
								{strain}
							</button>
						</li>
					))}
				</ul>
			)}
			{autoCompleteResult.length === 0 && !isLoading && (
				<p>No strains found</p>
			)}
		</div>
	);
}
