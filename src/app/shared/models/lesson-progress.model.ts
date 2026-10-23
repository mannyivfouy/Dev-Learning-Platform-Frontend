import { Lesson } from './lesson.model';

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  is_complete: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  lesson?: Lesson;
}
