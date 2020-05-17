import { HandlerFunc, Context } from "https://deno.land/x/abc/mod.ts";
import { render } from "https://deno.land/x/dejs/mod.ts";
import blogs from "../db.ts";

interface IBlog {
  title: string;
  description: string;
}

export const createBlog: HandlerFunc = async (c: Context) => {
  try {
    const body: IBlog = await c.body();

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
    return c.json(error, 500);
  }
};

export const getAllBlogs: HandlerFunc = async (c: Context) => {
  try {
    const blog: IBlog = await blogs.find();
    return c.json(blog, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const getBlog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params;

    const blog = await blogs.findOne({ _id: { $oid: id } });

    if (blog) {
      return blog;
    }

    return c.string("Blog not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const updateBlog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params;

    const body: IBlog = await c.body();

    if (!Object.keys(body).length) {
      return c.string("Request body should not be empty", 400);
    }

    const blog = await blogs.findOne({ _id: { $oid: id } });

    if (blog) {
      const { matchedCount } = await blogs.updateOne(
        { _id: { $oid: id } },
        { $set: body }
      );
      if (matchedCount) {
        return c.string("Updated", 204);
      }
      return c.string("Cannot update blog");
    }

    return c.string("Blog not available", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const deleteBlog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params;

    const blog = await blogs.findOne({ _id: { $oid: id } });

    if (blog) {
      const deleteCount = await blogs.deleteOne({ _id: { $oid: id } });
      if (deleteCount) {
        return c.string("Deleted", 204);
      }
      return c.string("Cannot delete blog");
    }

    return c.string("Blog not available", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};
