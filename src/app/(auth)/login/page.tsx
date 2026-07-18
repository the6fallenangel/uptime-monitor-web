import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthCard title="Welcome Back" desc="Sign in to manage your monitors.">
      <LoginForm />
    </AuthCard>
  );
}
