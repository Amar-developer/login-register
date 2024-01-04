import { getUserData, removeUserData } from "./Storage";

export const isAuthenticate = () => {
  return getUserData() != null ? true : false;
};

export const logout = () => {
  removeUserData();
};
