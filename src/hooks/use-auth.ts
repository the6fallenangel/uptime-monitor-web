import { getMe, login, logout, signup } from "@/lib/auth";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
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
