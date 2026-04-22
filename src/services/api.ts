const BASE_URL = "https://reqres.in/api";
const API_KEY = "reqres_c580d898157b4e55affdc9696f1b402c";

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=1`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    console.log("status:", response.status);

    const json = await response.json();
    console.log("data:", json);

    return json;
  } catch (error) {
    console.log("API ERROR:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const createUser = async (name: string, job: string) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ name, job }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};
