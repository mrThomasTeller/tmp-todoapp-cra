export default interface User {
  id: number;
  name: string;
}

export type UserId = User['id'];
