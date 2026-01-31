import { ModuleDetailClient } from "@/components/modules/module-detail-client";

interface ModuleDetailPageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleDetailPage({
  params,
}: ModuleDetailPageProps) {
  const { moduleId } = await params;
  return <ModuleDetailClient moduleId={moduleId} />;
}
