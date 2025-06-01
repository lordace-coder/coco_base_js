import {Cocobase} from "../src/index.js"

const db = new Cocobase({ apiKey: 'vA6352GeZvZzC5ezC7xR2zSMddPF4oSDRfVUOW-U' });

async function run() {
  const newUser = await db.createDocument('users', { });

await db.updateDocument("users","9175cca7-5989-4381-ba03-872f1102df0f",{"password":"password", name: 'Alice', age: 30})
}
run()