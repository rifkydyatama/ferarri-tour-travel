import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center">
      <LoginForm nextPath="/admin" />
    </div>
  );
}

