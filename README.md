# Cocobase SDK

The official JavaScript/TypeScript SDK for Cocobase, a powerful Backend-as-a-Service platform.

## Installation

```bash
npm install cocobase
```

## Usage

```typescript
import { Cocobase } from "cocobase";

// Initialize the client
const db = new Cocobase({
  apiKey: "your-api-key",
});

// Create a document
const newUser = await db.createDocument("users", {
  name: "Alice",
  age: 30,
});

// Get a document
const user = await db.getDocument("users", newUser.id);

// Update a document
await db.updateDocument("users", newUser.id, {
  age: 31,
});

// List documents
const users = await db.listDocuments("users");

// Delete a document
await db.deleteDocument("users", newUser.id);
```

## API Reference

### `new Cocobase(config)`

Creates a new Cocobase client instance.

- `config.apiKey` - Your Cocobase API key

### Documents

#### `createDocument<T>(collection: string, data: T): Promise<Document<T>>`

Creates a new document in the specified collection.

#### `getDocument<T>(collection: string, docId: string): Promise<Document<T>>`

Retrieves a document by its ID.

#### `updateDocument<T>(collection: string, docId: string, data: Partial<T>): Promise<Document<T>>`

Updates an existing document.

#### `deleteDocument(collection: string, docId: string): Promise<{ success: boolean }>`

Deletes a document.

#### `listDocuments<T>(collection: string): Promise<Document<T>[]>`

Lists all documents in a collection.

## Types

```typescript
interface Document<T> {
  data: T;
  id: string;
  collection_id: string;
  created_at: string;
  collection: {
    name: string;
    id: string;
    created_at: string;
  };
}
```

## License

MIT
