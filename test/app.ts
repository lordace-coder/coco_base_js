import { Cocobase } from "../src/index.js";

interface Post {
  title: string;
  content?: string;
  author?: string;
}
const db = new Cocobase({ apiKey: "vA6352GeZvZzC5ezC7xR2zSMddPF4oSDRfVUOW-U" });

async function run() {
  const user = await db.register("lordyacey@gmail.com", "password", {
    firstName: "Acy",
  });

  db.logout();
}
run();
