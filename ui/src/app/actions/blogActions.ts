"use server";

import { revalidatePath } from "next/cache";

const apiURL = process.env.API_URL || "http://localhost:4000/api/blogs";

export async function post(payload: any) {
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

export async function getLastPosts(limit: number) {
  try {
    const response = await fetch(`${apiURL}/getLastPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: limit,
      }),
    });
    const data = await response.json();
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
