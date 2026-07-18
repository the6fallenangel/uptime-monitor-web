import { api } from "@/lib/api";
import { type User } from "@/lib/types";

export function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api.post<User>("/signup", data);
}

export function login(data: { email: string; password: string }) {
  return api.post<User>("/login", data);
}

export function logout() {
  return api.post<void>("/logout");
}

export function getMe() {
  return api.get<User>("/me");
}

export function updateName(name: string) {
  return api.patch<User>("/me/name", { name });
}

export function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  return api.post<void>("/me/password", data);
}
