import { defaultHomeContent } from "@/lib/landing/defaultHomeContent";
import { getHomeContent } from "@/lib/landing/getHomeContent";
import LandingContentEditor from "./LandingContentEditor";

export default async function AdminKontenPage() {
  const content = await getHomeContent();

  const initialJson = JSON.stringify(content ?? defaultHomeContent, null, 2);

  return <LandingContentEditor initialJson={initialJson} />;
}
