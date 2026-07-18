import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create an account"
      desc="Start monitoring your endpoints in minutes."
    >
      <SignupForm />
    </AuthCard>
  );
}
