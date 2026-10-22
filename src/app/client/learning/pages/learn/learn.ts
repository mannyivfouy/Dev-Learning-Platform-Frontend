import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LessonService } from '../../services/lesson';
import { Lesson } from '../../../../shared/models/lesson.model';
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-learn',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './learn.html',
  styleUrl: './learn.css',
})
export class Learn implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lessonService = inject(LessonService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly ArrowLeft = ArrowLeft;
  readonly BookOpenCheck = BookOpenCheck;

  courseId = '';
  lessonId = '';
  lessons: Lesson[] = [];

  currentLesson: Lesson | null = null;
  isLoading = true;
  errorMessage = '';
  errorType: 'access' | 'general' | '' = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId') ?? '';
      this.lessonId = params.get('lessonId') ?? '';

      this.loadLesson();
      this.loadLessons();
    });
  }

  private loadLesson(): void {
  this.lessonService.findOne(this.lessonId).subscribe({
    next: (response) => {
      this.currentLesson = response.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    },

    // CHANGED
    error: (error) => {
      if (error.status === 403) {
        this.errorType = 'access';
        this.errorMessage =
          'You need to enroll in this course to access this lesson.';
      } else {
        console.error('Failed to load lesson:', error);

        this.errorType = 'general';
        this.errorMessage = 'Unable to load lesson.';
      }

      this.isLoading = false;

      this.cdr.detectChanges();
    },
  });
}

  private loadLessons(): void {
    this.lessonService.findByCourse(this.courseId).subscribe({
      next: (response) => {
        this.lessons = response.data;
      },
      error: (error) => {
        console.error('Failed to load course lessons:', error);

        this.errorType = 'general';
        this.errorMessage = 'Unable to load lessons.';

        this.isLoading = false;
      },
    });
  }

  goToPreviousLesson(): void {
    const currentIndex = this.lessons.findIndex((lesson) => lesson.id === this.currentLesson?.id);

    if (currentIndex > 0) {
      const previousLesson = this.lessons[currentIndex - 1];

      this.router.navigate(['/courses', this.courseId, 'learn', previousLesson.id]);
    }
  }

  goToNextLesson(): void {
    const currentIndex = this.lessons.findIndex((lesson) => lesson.id === this.currentLesson?.id);

    if (currentIndex < this.lessons.length - 1) {
      const nextLesson = this.lessons[currentIndex + 1];

      this.router.navigate(['/courses', this.courseId, 'learn', nextLesson.id]);
    }
  }
}
