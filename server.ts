import { Application } from "https://deno.land/x/abc/mod.ts";
import { createBlog } from "./controllers/blogs.ts";

const app = new Application();

app.post("/blogs", createBlog).start({ port: 8080 });

console.log("listening in port 8080");
