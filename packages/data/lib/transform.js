"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformData = transformData;
function transformData(doc) {
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
    }
    catch (error) {
        return { transformed: false, error };
    }
}
