import Task from './types/Task';

export async function loadTasks(): Promise<Task[]> {
  const res = await fetch('/api/tasks');
  return res.json();
}

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
    return Promise.reject(error);
  } else {
    return await res.json();
  }
}

export async function updateTask(newTask: Task): Promise<void> {
  await fetch(`/api/tasks/${newTask.id}`, {
    method: 'PUT',
    body: JSON.stringify(newTask),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
