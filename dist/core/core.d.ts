import { CocobaseConfig, Document, AppUser } from "../types/types";
export declare class Cocobase {
    private baseURL;
    private apiKey?;
    private token?;
    user?: AppUser;
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
    initAuth(): Promise<void>;
    setToken(token: string): void;
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string, data?: Record<string, any>): Promise<void>;
    logout(): void;
    isAuthenticated(): boolean;
    getCurrentUser(): Promise<AppUser>;
    updateUser(data?: Record<string, any> | null, email?: string | null, password?: string | null): Promise<AppUser>;
}
//# sourceMappingURL=core.d.ts.map