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
//# sourceMappingURL=types.d.ts.map