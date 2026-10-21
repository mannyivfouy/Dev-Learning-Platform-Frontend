import { Course } from "./course.model";

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  content: string;
  lesson_order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  course?: Course
}
