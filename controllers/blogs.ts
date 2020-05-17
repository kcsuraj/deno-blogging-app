import { HandlerFunc, Context } from "https://deno.land/x/abc/mod.ts";
import { render } from "https://deno.land/x/dejs/mod.ts";
import blogs from "../db.ts";

const template = `<body>
  <% if (name) { %>
    <h1>hello, <%= name %>!</h1>
  <% } %>
</body>`;

export const createBlog: HandlerFunc = async (c: Context) => {
  try {
    const body: any = await c.body();

    if (!Object.keys(body).length) {
      return c.string("Request body should not be empty", 400);
    }

    const { title, description } = body;

    const newBlog = await blogs.insertOne({
      title,
      description,
    });

    return c.json(newBlog, 200);
  } catch (error) {
    console.log("nice");
    return c.json(error, 500);
  }
};
