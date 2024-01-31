import axios from "axios";

export const login = async (data) => {
  return axios.post("/api/auth/login", {
    ...data,
  });
};
export const signup = async (data) => {
  return axios.post("/api/auth/signup", {
    ...data,
  });
};

export function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: token,
    };
  } else {
    return {};
  }
}
