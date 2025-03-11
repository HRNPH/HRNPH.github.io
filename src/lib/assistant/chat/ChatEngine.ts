/**
 * ChatEngine - A utility class for interacting with the personal data chatbot API
 */
export class ChatEngine {
    private apiUrl: string;
    private history: Array<{ is_user?: boolean; role?: 'user' | 'assistant'; content: string }> = [];
    private chatMessages: ChatMessage[] = [];
    private tagLimits: number;

    /**
     * Creates a new ChatEngine instance
     * @param apiUrl - The URL for the chatbot API endpoint (default: 'eva-rag-dev.hrnph.dev')
     * @param tagLimits - The maximum number of tags to return (default: 5)
     */
    constructor(apiUrl: string = 'https://eva-rag-dev.hrnph.dev', tagLimits: number = 5) {
        this.apiUrl = apiUrl;
        this.tagLimits = tagLimits;
    }

    // Helper method to create a chat message with a unique id.
    private createChatMessage(type: 'user' | 'agent', content: string): ChatMessage {
        return { id: `${type}-${Date.now()}`, type, content };
    }

    // Helper method to add a message to the API history.
    private addHistory(isUser: boolean, content: string): void {
        this.history.push({ is_user: isUser, content });
    }

    /**
     * Sends a query to the chatbot API and returns the response
     * @param query - The user's question or message
     * @returns A Promise resolving to the chatbot's response
     */
    public async sendMessage(query: string): Promise<string> {
        try {
            this.addHistory(true, query);

            const payload = {
                query,
                history: this.history,
                tag_limits: this.tagLimits
            };

            console.log('Sending payload to API:', JSON.stringify(payload));

            const response = await fetch(`${this.apiUrl}/score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            const answer = data.answer;

            this.addHistory(false, answer);
            return answer;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    /**
     * Sends a user message and updates the chat message UI format
     * @param message - The user's question or message
     * @returns A Promise resolving to the updated array of chat messages
     */
    public async sendChatMessage(message: string): Promise<ChatMessage[]> {
        try {
            const userMessage = this.createChatMessage('user', message);
            this.chatMessages.push(userMessage);

            const answer = await this.sendMessage(message);

            const assistantMessage = this.createChatMessage('agent', answer);
            this.chatMessages.push(assistantMessage);

            return [...this.chatMessages];
        } catch (error) {
            console.error('Error sending chat message:', error);
            const errorMessage = this.createChatMessage('agent', 'Sorry, I encountered an error processing your request. Please try again.');
            this.chatMessages.push(errorMessage);
            return [...this.chatMessages];
        }
    }

    /**
     * Initialize the chat with a welcome message
     * @param welcomeMessage - Optional custom welcome message
     * @returns The current chat messages array
     */
    public initChat(welcomeMessage: string = 'Hello! How can I help you today?'): ChatMessage[] {
        if (this.chatMessages.length === 0) {
            const initialMessage = this.createChatMessage('agent', welcomeMessage);
            this.chatMessages = [initialMessage];
            this.history = [{ is_user: false, content: welcomeMessage }];
        }
        return [...this.chatMessages];
    }

    /**
     * Reset the chat to its initial state with a welcome message
     * @param welcomeMessage - Optional custom welcome message
     * @returns The reset chat messages array
     */
    public resetChat(welcomeMessage: string = 'Do you have any questions?'): ChatMessage[] {
        this.clearHistory();
        return this.initChat(welcomeMessage);
    }

    /**
     * Get the current chat messages in UI format
     * @returns The current chat messages array
     */
    public getChatMessages(): ChatMessage[] {
        return this.chatMessages.length ? [...this.chatMessages] : this.initChat();
    }

    /**
     * Clears the chat history (both API and UI formats)
     */
    public clearHistory(): void {
        this.history = [];
        this.chatMessages = [];
    }

    /**
     * Returns the current API history
     * @returns An array of message objects
     */
    public getHistory(): Array<{ role: 'user' | 'assistant'; content: string }> {
        return this.history.map(({ is_user, role, content }) => ({
            role: role || (is_user ? 'user' : 'assistant'),
            content
        }));
    }

    /**
     * Updates the tag limits setting
     * @param newLimit - The new tag limit value
     */
    public setTagLimits(newLimit: number): void {
        this.tagLimits = newLimit;
    }

    /**
     * Exports the chat history in a format suitable for saving or transferring
     * @returns A JSON string representation of both history formats
     */
    public exportHistory(): string {
        return JSON.stringify({
            apiHistory: this.history,
            chatMessages: this.chatMessages
        });
    }

    /**
     * Imports a previously exported chat history
     * @param historyJson - A JSON string containing chat history
     */
    public importHistory(historyJson: string): void {
        try {
            const parsed = JSON.parse(historyJson);

            if (parsed.apiHistory && Array.isArray(parsed.apiHistory)) {
                this.history = parsed.apiHistory;
            }

            if (parsed.chatMessages && Array.isArray(parsed.chatMessages)) {
                this.chatMessages = parsed.chatMessages;
            } else if (Array.isArray(parsed)) {
                // Legacy format conversion
                this.history = parsed.map(msg => ({
                    is_user: msg.role === 'user',
                    content: msg.content
                }));

                this.chatMessages = parsed.map((msg, index) => ({
                    id: `${msg.role === 'user' ? 'user' : 'agent'}-${index}`,
                    type: msg.role === 'user' ? 'user' : 'agent',
                    content: msg.content
                }));
            } else {
                throw new Error('Invalid history format');
            }
        } catch (error) {
            console.error('Error importing history:', error);
            throw error;
        }
    }
}

/**
 * Interface for the chat message format used in the UI
 */
export interface ChatMessage {
    id: string;
    type: 'user' | 'agent';
    content: string;
}