import Task, { TaskId } from './types/Task';

export async function createTask(title: string): Promise<Task> {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }

  return res.json();
}

export async function updateTask(task: Task): Promise<void> {
  await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteTask(id: TaskId): Promise<void> {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function getTasks(): Promise<Task[]> {
  const result = await fetch('/api/tasks');
  return result.json();
}
