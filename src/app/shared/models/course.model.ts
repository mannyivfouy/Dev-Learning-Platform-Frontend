import { Category } from "./category.model";

export interface Course {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number | null;
  status: 'draft' | 'published';
  lesson_count: number;
  created_at: string;
  updated_at: string;
  category: Category;
}
