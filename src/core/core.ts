import { CocobaseConfig, Document } from "../types/types";


export class Cocobase {
  private baseURL: string;
  private apiKey?: string;

  constructor(config: CocobaseConfig) {
    this.baseURL = "https://futurebase.fly.dev/";
    this.apiKey = config.apiKey;
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'x-api-key': `${this.apiKey}` } : {}),
        },
        ...(body ? { body: JSON.stringify({data:body}) } : {}),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorDetail;
        try {
          errorDetail = JSON.parse(errorText);
        } catch {
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

      return res.json() as Promise<T>;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error during ${method} request to ${url}: ${error}`);
    }
  }

  private getErrorSuggestion(status: number, method: string): string {
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
  async getDocument<T = any>(
    collection: string,
    docId: string
  ): Promise<Document<T>> {
    return this.request<Document<T>>('GET', `/collections/${collection}/documents/${docId}`);
  }

  // Create a new document
  async createDocument<T = any>(
    collection: string,
    data: T
  ): Promise<Document<T>> {
    return this.request<Document<T>>('POST', `/collections/documents?collection=${collection}`, data);
  }

  // Update a document
  async updateDocument<T = any>(
    collection: string,
    docId: string,
    data: Partial<T>
  ): Promise<Document<T>> {
    return this.request<Document<T>>('PATCH', `/collections/${collection}/documents/${docId}`, data);
  }

  // Delete a document
  async deleteDocument(
    collection: string,
    docId: string
  ): Promise<{ success: boolean }> {
    return this.request('DELETE', `/collections/${collection}/documents/${docId}`);
  }

  // List documents
  async listDocuments<T = any>(
    collection: string
  ): Promise<Document<T>[]> {
    return this.request<Document<T>[]>('GET', `/collections/${collection}/documents`);
  }
}
