import fs from 'fs';
import * as chromePdf from 'html-pdf-chrome';

async function generatePDF(htmlContent: string, outputPath: string) {
	const createResult = await chromePdf.create(htmlContent);
	const pdfBuffer = await createResult.toBuffer();
	fs.writeFileSync(outputPath, pdfBuffer);
	console.log(`PDF généré ${outputPath}`);
}

export async function saveToPdf(
	htmlContent: string,
	filename: string,
	outputPath: string,
) {
	const canSaveFile = filename !== '.pdf';

	if (canSaveFile) {
		console.log(`Generating pdf in : ${outputPath}`);
		try {
			await generatePDF(htmlContent, outputPath);
		} catch (error) {
			console.log(`Error generating pdf file : ${outputPath}; ${error}`);
		}
	}
}
