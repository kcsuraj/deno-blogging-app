import { Application } from "https://deno.land/x/abc/mod.ts";
import {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} from "./controllers/blogs.ts";

const app = new Application();

app
  .get("/blogs", getAllBlogs)
  .get("/blog/:id", getAllBlogs)
  .post("/blogs", createBlog)
  .put("/blogs/:id", updateBlog)
  .delete("/blogs/:id", deleteBlog)
  .start({ port: 8080 });

console.log("listening in port 8080");
