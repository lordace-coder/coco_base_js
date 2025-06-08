"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cocobase = void 0;
class Cocobase {
    constructor(config) {
        this.baseURL = "https://futurebase.fly.dev/";
        this.apiKey = config.apiKey;
    }
    async request(method, path, body) {
        const url = `${this.baseURL}${path}`;
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.apiKey ? { 'x-api-key': `${this.apiKey}` } : {}),
                },
                ...(body ? { body: JSON.stringify({ data: body }) } : {}),
            });
            if (!res.ok) {
                const errorText = await res.text();
                let errorDetail;
                try {
                    errorDetail = JSON.parse(errorText);
                }
                catch {
                    errorDetail = errorText;
                }
                const errorMessage = {
                    statusCode: res.status,
                    url,
                    method,
                    error: errorDetail,
                    suggestions: this.getErrorSuggestion(res.status, method)
                };
                throw new Error(`Request failed:\n${JSON.stringify(errorMessage, null, 2)}`);
            }
            return res.json();
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(`Unexpected error during ${method} request to ${url}: ${error}`);
        }
    }
    getErrorSuggestion(status, method) {
        switch (status) {
            case 401:
                return "Check if your API key is valid and properly set";
            case 403:
                return "You don't have permission to perform this action. Verify your access rights";
            case 404:
                return "The requested resource was not found. Verify the path and ID are correct";
            case 405:
                return `The ${method} method is not allowed for this endpoint. Check the API documentation for supported methods`;
            case 429:
                return "You've exceeded the rate limit. Please wait before making more requests";
            default:
                return "Check the API documentation and verify your request format";
        }
    }
    // Fetch a single document
    async getDocument(collection, docId) {
        return this.request('GET', `/collections/${collection}/documents/${docId}`);
    }
    // Create a new document
    async createDocument(collection, data) {
        return this.request('POST', `/collections/documents?collection=${collection}`, data);
    }
    // Update a document
    async updateDocument(collection, docId, data) {
        return this.request('PATCH', `/collections/${collection}/documents/${docId}`, data);
    }
    // Delete a document
    async deleteDocument(collection, docId) {
        return this.request('DELETE', `/collections/${collection}/documents/${docId}`);
    }
    // List documents
    async listDocuments(collection) {
        return this.request('GET', `/collections/${collection}/documents`);
    }
}
exports.Cocobase = Cocobase;
//# sourceMappingURL=core.js.map