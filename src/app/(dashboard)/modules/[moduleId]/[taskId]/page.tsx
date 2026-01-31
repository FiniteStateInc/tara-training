import { TaskPageClient } from "@/components/modules/task-page-client";

interface TaskPageProps {
  params: Promise<{ moduleId: string; taskId: string }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { moduleId, taskId } = await params;
  return <TaskPageClient moduleId={moduleId} taskId={taskId} />;
}
