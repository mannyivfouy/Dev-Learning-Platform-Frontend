import { Student } from "./student.model";
import { User } from "./user.model";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  data: {
    access_token: string;
    account: User | Student
  };
}
