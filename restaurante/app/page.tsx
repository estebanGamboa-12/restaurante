import { site } from "@/data/site";
import HomeClient from "@/components/HomeClient";

export default function Page() {
  return <HomeClient site={site} />;
}
