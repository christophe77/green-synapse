import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('syn-chat')
export class SynChat extends LitElement {
  @property({ type: String })
  apiUrl = 'http://vps-32f8344e.vps.ovh.net:5173';

  @state()
  private messages: Array<{ role: 'user' | 'assistant', content: string }> = [];

  @state()
  private inputValue = '';

  @state()
  private isLoading = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      font-family: 'Roboto', sans-serif;
    }

    .chat-container {
      display: flex;
      flex-direction: column;
      height: 400px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .message {
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
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
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
      background-color: white;
    }

    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      margin-right: 0.5rem;
      font-size: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #2e7d32;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #1b5e20;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .loading::after {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #2e7d32;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  private async sendMessage() {
    if (!this.inputValue.trim() || this.isLoading) return;

    const userMessage = this.inputValue.trim();
    this.messages = [...this.messages, { role: 'user', content: userMessage }];
    this.inputValue = '';
    this.isLoading = true;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      this.messages = [...this.messages, { role: 'assistant', content: data.response }];
    } catch (error) {
      console.error('Error:', error);
      this.messages = [...this.messages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }];
    } finally {
      this.isLoading = false;
    }
  }

  private handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  render() {
    return html`
      <div class="chat-container">
        <div class="messages">
          ${this.messages.map(msg => html`
            <div class="message ${msg.role}-message">
              ${msg.content}
            </div>
          `)}
          ${this.isLoading ? html`
            <div class="loading"></div>
          ` : ''}
        </div>
        <div class="input-container">
          <input
            type="text"
            .value=${this.inputValue}
            @input=${(e: Event) => this.inputValue = (e.target as HTMLInputElement).value}
            @keypress=${this.handleKeyPress}
            placeholder="Ask me anything about cannabis..."
            ?disabled=${this.isLoading}
          >
          <button @click=${this.sendMessage} ?disabled=${this.isLoading}>
            Send
          </button>
        </div>
      </div>
    `;
  }
} 