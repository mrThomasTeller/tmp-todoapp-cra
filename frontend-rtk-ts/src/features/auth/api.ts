import Credentials from './types/Credentials';
import RegisterData from './types/RegisterData';
import User from './types/User';

// ts
export async function user(): Promise<
  | {
      isLoggedIn: true;
      user: User;
    }
  | {
      isLoggedIn: false;
    }
> {
  return (await fetch('/api/auth/user')).json();
}

export async function login(credentials: Credentials): Promise<User> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export async function register(data: RegisterData): Promise<User> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export async function logout(data: RegisterData): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}
