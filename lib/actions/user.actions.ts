"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Posts from "../models/post.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const posts = await User.findOne({ id: userId }).populate({
      path: "posts",
      model: Posts,
      populate: [
        {
          path: "children",
          model: Posts,
          populate: {
            path: "author",
            model: User,
            select: "name image id",
          },
        },
      ],
    });
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

export async function fetchUsers({
  userId,
  searchString = ""
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const usersQuery = User.find(query)

    const users = await usersQuery.exec();

    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
