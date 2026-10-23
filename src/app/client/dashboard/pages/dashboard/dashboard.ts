import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { Student } from '../../../../shared/models/student.model';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { LessonProgress } from '../../../../shared/models/lesson-progress.model';
import { forkJoin } from 'rxjs';
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CheckCircle2,
  Clock,
  LucideAngularModule,
  Play,
  TrendingUp,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly ArrowRight = ArrowRight;
  readonly BookOpen = BookOpen;
  readonly BookOpenCheck = BookOpenCheck;
  readonly CheckCircle2 = CheckCircle2;
  readonly Clock = Clock;
  readonly Play = Play;
  readonly TrendingUp = TrendingUp;

  student: Student | null = null;
  enrollments: Enrollment[] = [];
  lessonProgress: LessonProgress[] = [];

  isLoading = true;
  errorMessage = '';

  completedLessonCount = 0;
  overallProgress = 0;

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    forkJoin({
      profile: this.dashboardService.getProfile(),
      enrollments: this.dashboardService.getEnrollments(),
      progress: this.dashboardService.getLessonProgress(),
    }).subscribe({
      next: (response) => {
        this.student = response.profile.data;
        this.enrollments = response.enrollments.data;
        this.lessonProgress = response.progress.data;

        this.completedLessonCount = this.lessonProgress.filter(
          (progress) => progress.is_complete,
        ).length;

        this.overallProgress = this.calculateOverallProgress();

        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Dashboard error:', error);

        this.errorMessage = 'Unable to load dashboard data.';
        this.isLoading = false;
      },
    });
  }

  private calculateOverallProgress(): number {
    if (this.enrollments.length === 0) {
      return 0;
    }

    const totalLessons = this.enrollments.reduce(
      (total, enrollment) => total + enrollment.course.lesson_count,
      0,
    );

    if (totalLessons === 0) {
      return 0;
    }

    const completedLessons = this.enrollments.reduce(
      (total, enrollment) => total + this.getCompletedLessons(enrollment.course.id),
      0,
    );

    return Math.round((completedLessons / totalLessons) * 100);
  }

  private getCompletedLessons(courseId: string): number {
    return this.lessonProgress.filter(
      (progress) => progress.is_complete && progress.lesson?.course_id === courseId,
    ).length;
  }

  getCourseProgress(courseId: string): number {
    const enrollment = this.enrollments.find((item) => item.course_id === courseId);

    if (!enrollment) {
      return 0;
    }

    const totalLessons = Number(enrollment.course.lesson_count);

    if (!Number.isFinite(totalLessons) || totalLessons <= 0) {
      return 0;
    }

    const completedLessons = this.getCompletedLessons(courseId);

    return Math.round((completedLessons / totalLessons) * 100);
  }
}
