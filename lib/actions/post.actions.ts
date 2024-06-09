"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Post from "../models/post.model";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    });

  const totalPostsCount = await Post.countDocuments({
    parentId: { $in: [null, undefined] },
  })

  const posts = await postsQuery.exec();

  return { posts };
}

interface Params {
  text: string,
  author: string,
  path: string,
}

export async function createPost({ text, author, path }: Params
) {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text,
      author,
    });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create posts: ${error.message}`);
  }
}
