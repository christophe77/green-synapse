export type SetSelectedStrain = React.Dispatch<
	React.SetStateAction<{
		selectedStrain: string;
	}>
>;
export type GlobalState = {
	selectedStrain: string;
	setSelectedStrain: SetSelectedStrain;
};
