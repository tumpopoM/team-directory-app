const BASE_URL = "https://reqres.in/api";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users?page=1`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

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
    },
    body: JSON.stringify({ name, job }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};
