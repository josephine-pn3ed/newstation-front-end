export const login = (
  email: string,
  user: string,
  company_id: string,
  id: string
) => {
  localStorage.setItem("user_email", email);
  localStorage.setItem("company_id", company_id);
  localStorage.setItem("user", user);
  localStorage.setItem("user_id", id);
};

export const logout = () => {
  localStorage.removeItem("user_email");
  localStorage.removeItem("company_id");
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");
};

export const isLogin = () => {
  if (localStorage.getItem("user_email")) {
    return true;
  }
  return false;
};

export const getUserEmail = () => {
  return localStorage.getItem("user_email");
};

export const getCompanyId = () => {
  return localStorage.getItem("company_id");
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
};

export const removeCompanyId = () => {
  localStorage.removeItem("company_id");
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
