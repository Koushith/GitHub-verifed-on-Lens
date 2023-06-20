export const validateEmail = (email: string) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const isValidRepo = (repoStr: string) => {
  return repoStr.indexOf("/") > -1 && repoStr.split("/").length === 2;
};
