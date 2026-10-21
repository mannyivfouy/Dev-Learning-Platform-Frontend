import { Role } from './role.model';

export interface User {
  id: string;
  role_id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  avatar: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  role?: Role;
}
