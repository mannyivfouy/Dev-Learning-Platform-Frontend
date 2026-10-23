export interface UpdateProfile {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  avatar: string | null
}
