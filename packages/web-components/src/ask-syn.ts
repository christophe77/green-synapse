import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import config from '@green-synapse/shared/config';
import { marked } from 'marked';

// Utiliser la version synchrone de marked
marked.setOptions({
	async: false
});

@customElement('ask-syn')
export class AskSyn extends LitElement {
	@property() messages: Array<{ role: string; content: string }> = [];
	@state() inputValue = '';
	@state() isLoading = false;

	static styles = css`
		.chat-container {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			font-family: 'Roboto', sans-serif;
		}

		.messages {
			height: 400px;
			overflow-y: auto;
			border: 1px solid #ccc;
			border-radius: 4px;
			padding: 10px;
			margin-bottom: 20px;
		}

		.message {
			margin: 10px 0;
			padding: 10px;
			border-radius: 4px;
			max-width: 80%;
		}

		.user-message {
			background-color: #e3f2fd;
			margin-left: auto;
		}

		.assistant-message {
			background-color: #f5f5f5;
		}

		.input-container {
			display: flex;
			gap: 10px;
		}

		input {
			flex: 1;
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-size: 16px;
		}

		button {
			padding: 10px 20px;
			background-color: #4caf50;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 16px;
		}

		button:disabled {
			background-color: #cccccc;
			cursor: not-allowed;
		}

		.loading {
			display: inline-block;
			width: 20px;
			height: 20px;
			border: 3px solid #f3f3f3;
			border-top: 3px solid #4caf50;
			border-radius: 50%;
			animation: spin 1s linear infinite;
			margin-left: 10px;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		/* Styles pour le Markdown */
		.message-content {
			line-height: 1.5;
		}

		.message-content p {
			margin: 0.5em 0;
		}

		.message-content code {
			background-color: #f0f0f0;
			padding: 2px 4px;
			border-radius: 3px;
			font-family: monospace;
		}

		.message-content pre {
			background-color: #f0f0f0;
			padding: 1em;
			border-radius: 4px;
			overflow-x: auto;
		}

		.message-content pre code {
			background-color: transparent;
			padding: 0;
		}

		.message-content ul, .message-content ol {
			margin: 0.5em 0;
			padding-left: 1.5em;
		}

		.message-content h1, .message-content h2, .message-content h3 {
			margin: 1em 0 0.5em;
		}

		.message-content blockquote {
			border-left: 4px solid #ccc;
			margin: 0.5em 0;
			padding-left: 1em;
			color: #666;
		}

		.message-content a {
			color: #2196f3;
			text-decoration: none;
		}

		.message-content a:hover {
			text-decoration: underline;
		}
	`;

	async sendMessage() {
		if (!this.inputValue.trim() || this.isLoading) return;

		const question = this.inputValue.trim();
		this.messages = [...this.messages, { role: 'user', content: question }];
		this.inputValue = '';
		this.isLoading = true;

		try {
			const response = await fetch(`${config.apiUrl}/api/ask`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ question, messages: this.messages }),
			});

			const data = await response.json();
			this.messages = [
				...this.messages,
				{ role: 'assistant', content: data.response },
			];
		} catch (error) {
			console.error('Error:', error);
			this.messages = [
				...this.messages,
				{
					role: 'assistant',
					content: 'Sorry, there was an error processing your request.',
				},
			];
		} finally {
			this.isLoading = false;
		}
	}

	handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			this.sendMessage();
		}
	}

	renderMessage(message: { role: string; content: string }) {
		if (message.role === 'assistant') {
			const htmlContent = marked(message.content) as string;
			return html`
				<div class="message-content">
					${unsafeHTML(htmlContent)}
				</div>
			`;
		}
		return message.content;
	}

	render() {
		return html`
			<div class="chat-container">
				<div class="messages">
					${this.messages.map(
						(message) => html`
							<div
								class="message ${message.role === 'user'
									? 'user-message'
									: 'assistant-message'}"
							>
								${this.renderMessage(message)}
							</div>
						`,
					)}
				</div>
				<div class="input-container">
					<input
						type="text"
						.value=${this.inputValue}
						@input=${(e: InputEvent) =>
							(this.inputValue = (e.target as HTMLInputElement).value)}
						@keypress=${this.handleKeyPress}
						placeholder="Type your message..."
						?disabled=${this.isLoading}
					/>
					<button
						@click=${this.sendMessage}
						?disabled=${this.isLoading || !this.inputValue.trim()}
					>
						Send
					</button>
					${this.isLoading ? html`<div class="loading"></div>` : ''}
				</div>
			</div>
		`;
	}
}
