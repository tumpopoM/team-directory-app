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
