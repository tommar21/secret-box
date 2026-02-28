import { notFound } from "next/navigation";
import { getProject } from "@/lib/actions/projects";
import { getGlobalVariables } from "@/lib/actions/variables";
import { ProjectView } from "@/components/project-view";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const [project, globals] = await Promise.all([
    getProject(id).catch(() => null),
    getGlobalVariables().catch(() => []),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} globals={globals} />;
}
