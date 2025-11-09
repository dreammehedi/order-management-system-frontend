import Cookies from "js-cookie";

export const getAdminToken = (): string | undefined => {
  return Cookies.get("adminToken");
};

export const setAdminToken = (token: string): void => {
  Cookies.set("adminToken", token, { expires: 7, secure: true });
};

export const removeAdminToken = (): void => {
  Cookies.remove("adminToken");
};
