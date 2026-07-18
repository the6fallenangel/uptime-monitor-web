import {
  changePassword,
  getMe,
  login,
  logout,
  signup,
  updateName,
} from "@/lib/auth";
import type { User } from "@/lib/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useMe(options?: { initialData?: User }) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    initialData: options?.initialData,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      router.push("/monitors");
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      router.push("/monitors");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.clear();
      router.push("login");
    },
  });
}

export function useUpdateName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateName,
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
