import { notFound } from "next/navigation";
import { getTeam } from "@/lib/actions/teams";
import { TeamDetailClient } from "./team-detail-client";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const team = await getTeam(id);
    return <TeamDetailClient initialTeam={team} id={id} />;
  } catch {
    notFound();
  }
}
