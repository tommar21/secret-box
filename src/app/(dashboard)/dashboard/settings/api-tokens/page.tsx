import { getApiTokens } from "@/lib/actions/api-tokens";
import { ApiTokensClient } from "./api-tokens-client";

export default async function ApiTokensPage() {
  const tokens = await getApiTokens();
  return <ApiTokensClient initialTokens={tokens} />;
}
