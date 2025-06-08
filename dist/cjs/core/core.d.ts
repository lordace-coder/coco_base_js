import { CocobaseConfig, Document } from "../types/types";
export declare class Cocobase {
    private baseURL;
    private apiKey?;
    constructor(config: CocobaseConfig);
    private request;
    private getErrorSuggestion;
    getDocument<T = any>(collection: string, docId: string): Promise<Document<T>>;
    createDocument<T = any>(collection: string, data: T): Promise<Document<T>>;
    updateDocument<T = any>(collection: string, docId: string, data: Partial<T>): Promise<Document<T>>;
    deleteDocument(collection: string, docId: string): Promise<{
        success: boolean;
    }>;
    listDocuments<T = any>(collection: string): Promise<Document<T>[]>;
}
//# sourceMappingURL=core.d.ts.map