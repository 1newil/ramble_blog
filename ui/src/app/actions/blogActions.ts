"use server";

import { revalidatePath } from "next/cache";

const apiURL = process.env.API_URL || "http://localhost:4000/api/blogs";

export async function post(payload: any) {
  try {
    const response = await fetch(apiURL, {
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

export async function getPosts() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}
