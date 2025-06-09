# Cocobase SDK

The official JavaScript/TypeScript SDK for Cocobase, a powerful Backend-as-a-Service platform.

## Installation

```bash
npm install cocobase
```

## Quick Start

```typescript
import { Cocobase } from "cocobase";

// Initialize the client
const db = new Cocobase({
  apiKey: "your-api-key",
});

// Initialize authentication (checks for existing session)
await db.initAuth();

// Create a document
const newUser = await db.createDocument("users", {
  name: "Alice",
  age: 30,
});

// Get a document
const user = await db.getDocument("users", newUser.id);
```

## Authentication

Cocobase SDK provides comprehensive authentication features including user registration, login, and session management.

### User Registration

```typescript
// Register a new user
await db.register("user@example.com", "password123", {
  name: "John Doe",
  role: "user",
});

// Check if user is authenticated
if (db.isAuthenticated()) {
  console.log("User is logged in:", db.user);
}
```

### User Login

```typescript
// Login existing user
await db.login("user@example.com", "password123");

// Get current user info
const currentUser = await db.getCurrentUser();
console.log(currentUser);
```

### Session Management

```typescript
// Initialize auth on app start (restores session from localStorage)
await db.initAuth();

// Logout user
db.logout();

// Check authentication status
const isLoggedIn = db.isAuthenticated();
```

### User Profile Management

```typescript
// Update user data
await db.updateUser(
  { name: "Jane Doe", preferences: { theme: "dark" } }, // data
  "newemail@example.com", // email (optional)
  "newpassword123" // password (optional)
);

// Update only specific fields
await db.updateUser({ lastLogin: new Date().toISOString() });

// Update email only
await db.updateUser(null, "updated@example.com");
```

## Document Management

### Basic Operations

```typescript
// Create a document
const newPost = await db.createDocument("posts", {
  title: "My First Post",
  content: "Hello, world!",
  published: true,
});

// Get a document
const post = await db.getDocument("posts", newPost.id);

// Update a document
await db.updateDocument("posts", newPost.id, {
  title: "Updated Title",
  published: false,
});

// List all documents in a collection
const allPosts = await db.listDocuments("posts");

// Delete a document
await db.deleteDocument("posts", newPost.id);
```

## API Reference

### Constructor

#### `new Cocobase(config)`

Creates a new Cocobase client instance.

**Parameters:**

- `config.apiKey` - Your Cocobase API key (optional for some operations)

### Authentication Methods

#### `initAuth(): Promise<void>`

Initializes authentication by checking for existing tokens in localStorage and restoring user session.

#### `register(email: string, password: string, data?: Record<string, any>): Promise<void>`

Registers a new user account.

**Parameters:**

- `email` - User's email address
- `password` - User's password
- `data` - Optional additional user data

#### `login(email: string, password: string): Promise<void>`

Authenticates an existing user.

**Parameters:**

- `email` - User's email address
- `password` - User's password

#### `logout(): void`

Logs out the current user and clears the session.

#### `isAuthenticated(): boolean`

Returns whether a user is currently authenticated.

#### `getCurrentUser(): Promise<AppUser>`

Retrieves the current authenticated user's information.

#### `updateUser(data?: Record<string, any> | null, email?: string | null, password?: string | null): Promise<AppUser>`

Updates the current user's profile information.

**Parameters:**

- `data` - User data to update (merged with existing data)
- `email` - New email address
- `password` - New password

### Document Methods

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
interface CocobaseConfig {
  apiKey?: string;
}

interface Collection {
  name: string;
  id: string;
  created_at: string;
}

interface Document<T> {
  data: T;
  id: string;
  collection_id: string;
  created_at: string;
  collection: Collection;
}

interface AppUser {
  id: string;
  email: string;
  created_at: string;
  data: Record<string, any>;
  client_id: string;
}

interface TokenResponse {
  access_token: string;
}
```

## Error Handling

The SDK provides detailed error information for debugging:

```typescript
try {
  await db.createDocument("posts", { title: "Test" });
} catch (error) {
  console.error("Request failed:", error.message);
  // Error includes status code, URL, method, and suggestions
}
```

## Complete Example

```typescript
import { Cocobase } from "cocobase";

const db = new Cocobase({
  apiKey: "your-api-key",
});

async function main() {
  // Initialize auth
  await db.initAuth();

  if (!db.isAuthenticated()) {
    // Register or login user
    await db.register("user@example.com", "password123", {
      name: "John Doe",
    });
  }

  // Create a document
  const post = await db.createDocument("posts", {
    title: "Hello Cocobase",
    content: "This is my first post!",
    author: db.user?.id,
  });

  console.log("Created post:", post);

  // List all posts
  const posts = await db.listDocuments("posts");
  console.log("All posts:", posts);
}

main().catch(console.error);
```

## License

MIT
