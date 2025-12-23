import LoginForm from "@/components/auth/LoginForm";

export const runtime = "edge";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const nextParam = params.next;
  const nextPath =
    typeof nextParam === "string" && nextParam.startsWith("/")
      ? nextParam
      : "/admin";

  return <LoginForm nextPath={nextPath} />;
}

