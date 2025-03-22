import useStrainAutoComplete from './useStrainAutoComplete';
import styles from './StrainAutoComplete.module.css';

export default function StrainAutoComplete() {
	const {
		strain,
		autoCompleteResult,
		handleQueryChange,
		handleSuggestionClick,
		isLoading,
	} = useStrainAutoComplete();

	return (
		<div className={styles.strainAutoCompleteContainer}>
			<input
				type="text"
				value={strain.name}
				onChange={handleQueryChange}
				className={styles.input}
				placeholder="Search for strains..."
			/>
			{isLoading && <p className={styles.noResults}>Loading...</p>}
			{autoCompleteResult.length > 0 && (
				<ul className={styles.suggestionsList}>
					{autoCompleteResult.map((strain, index) => (
						<li key={`${strain}-${index}`} className={styles.suggestionItem}>
							<button
								onClick={() => handleSuggestionClick(strain)}
								onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(strain)}
								className={styles.suggestionButton}
							>
								{strain}
							</button>
						</li>
					))}
				</ul>
			)}
		{/* 	{autoCompleteResult.length === 0 && !isLoading && strain.name && (
				<p className={styles.noResults}>No strains found</p>
			)} */}
		</div>
	);
}
