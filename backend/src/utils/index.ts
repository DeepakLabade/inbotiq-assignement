export const genusername = () => {
  const usernameprefix = "user-";
  const name = Math.random().toString(36).slice(2);

  return usernameprefix + name;
};
