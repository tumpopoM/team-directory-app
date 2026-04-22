const BASE_URL = "https://reqres.in/api";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users?page=1`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
