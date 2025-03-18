let SynWebComponent: any;

(async () => {
    SynWebComponent = (await import('./syn/src/components/Syn/SynWebComponent.js')).default;
})();

// Define the custom element
if (!customElements.get('syn-web-component')) {
    customElements.define('syn-web-component', SynWebComponent);
  }