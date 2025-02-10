"use server";

const apiURL = process.env.API_URL || "http://localhost:4000";

export async function post(payload: any) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(error);
  }
}
