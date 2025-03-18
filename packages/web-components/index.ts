let SynWebComponent: any;

(async () => {
    if (typeof window !== 'undefined') { // Ensure we're in a browser environment
        try {
            const module = await import('./syn/src/components/Syn/SynWebComponent.js');
            SynWebComponent = module.default;

            // Now, ensure custom elements are only defined in the browser
            if (typeof customElements !== 'undefined' && SynWebComponent) {
                if (!customElements.get('syn-web-component')) {
                    customElements.define('syn-web-component', SynWebComponent);
                }
            }
        } catch (error) {
            console.error('Error importing SynWebComponent:', error);
        }
    }
})();