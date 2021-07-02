import jwt_decode from "jwt-decode";

export const login = (
  token: string
) => {

  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLogin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const getUserEmail = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: { user_email: string } = jwt_decode(token);
    const { user_email } = decodedToken;
    return user_email;
  }
  return null;
};

export const getCompanyId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: { company_id: string } = jwt_decode(token);
    const { company_id } = decodedToken;
    return company_id;
  }
  return null;
};

export const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: { user_id: string } = jwt_decode(token);
    const { user_id } = decodedToken;
    return user_id;
  }
  return null;
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: { user: string } = jwt_decode(token);
    const { user } = decodedToken;
    return user;
  }
  return null;
};
