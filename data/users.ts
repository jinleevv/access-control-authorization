const users = [
  {
    email: "test@test.com",
    password: "password",
  },
];

export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email);
  return found;
};
