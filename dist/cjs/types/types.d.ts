export interface CocobaseConfig {
    apiKey?: string;
}
export interface Collection {
    name: string;
    id: string;
    created_at: string;
}
export interface Document<T> {
    data: T;
    id: string;
    collection_id: string;
    created_at: string;
    collection: Collection;
}
export interface TokenResponse {
    access_token: string;
}
export interface AppUser {
    id: string;
    email: string;
    created_at: string;
    data: Record<string, any>;
    client_id: string;
}
//# sourceMappingURL=types.d.ts.map