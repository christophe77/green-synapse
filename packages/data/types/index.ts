export type Website = {
	name: string;
	sitemapUrl: string;
};
export type Transformed = {
	transformed: boolean;
	content?: string;
	error?: any;
}