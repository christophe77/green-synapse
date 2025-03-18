import { FC, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Syn from './Syn';

const SynComponent: FC = () => {
	return <Syn />;
};

class SynWebComponent extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });

		const mountPoint = document.createElement('div');
		shadow.appendChild(mountPoint);

		const root = ReactDOM.createRoot(mountPoint);
		root.render(
			<StrictMode>
				<SynComponent />
			</StrictMode>,
		);
	}
}

export default SynWebComponent;
