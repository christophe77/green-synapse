import { Transformed } from '../data/types';

export function transformData(doc: Document): Transformed {
	try {
		const header = doc.querySelector('#header');
		const footer = doc.querySelector('#footer');
		const category = doc.querySelector('#right_column');
		const ekomi = doc.querySelector('.ekomi-widget-container');

		if (header) {
			header.remove();
		}
		if (footer) {
			footer.remove();
		}
		if (category) {
			category.remove();
		}
		if (ekomi) {
			ekomi.remove();
		}

		const content = doc.documentElement.outerHTML;
		return { transformed: true, content };
	} catch (error) {
		return { transformed: false, error };
	}
}
