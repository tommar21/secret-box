import { fetchAuditLogs } from "@/lib/actions/audit";
import { ActivityClient } from "./activity-client";

export default async function ActivityPage() {
  const initialLogs = await fetchAuditLogs({ limit: 50, offset: 0 });
  return <ActivityClient initialLogs={initialLogs} />;
}
