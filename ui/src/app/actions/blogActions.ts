"use server";

import { revalidatePath } from "next/cache";
import { payload } from "../types/types";
const apiURL = process.env.API_URL || "http://localhost:3001/api/blogs";

export async function post(payload: payload) {
  try {
    const response = await fetch(`${apiURL}/post`, {
      method: "POST",
      body: JSON.stringify({ payload }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getLastPosts(page: number, limit: number) {
  try {
    const response = await fetch(`${apiURL}/getLastPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
        limit: limit,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`${apiURL}/get/${slug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function deletePost(id: string) {
  try {
    const response = await fetch(`${apiURL}/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}
