import { Course } from './course.model';

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  source: 'purchase' | 'subscription';
  status: 'active' | 'expired' | 'cancelled';
  enrolled_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  course: Course;
}
