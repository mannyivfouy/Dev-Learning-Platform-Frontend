import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../../../shared/models/course.model';
import {
  ArrowLeft,
  BookOpenCheck,
  Clock,
  CodeXml,
  CreditCard,
  LucideAngularModule,
} from 'lucide-angular';
import { LessonService } from '../../../learning/services/lesson';
import { Lesson } from '../../../../shared/models/lesson.model';
import { DashboardService } from '../../../dashboard/services/dashboard';
import { PaymentService } from '../../../payments/services/payment';

@Component({
  selector: 'app-course-detail',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly lessonService = inject(LessonService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly paymentService = inject(PaymentService);

  readonly ArrowLeft = ArrowLeft;
  readonly BookOpenCheck = BookOpenCheck;
  readonly Clock = Clock;
  readonly CodeXml = CodeXml;
  readonly CreditCard = CreditCard;

  course: Course | null = null;
  lessons: Lesson[] = [];
  isLoading = true;
  errorMessage = '';
  isPurchased = false;

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (!courseId) {
      this.errorMessage = 'Course not found.';
      this.isLoading = false;
      return;
    }

    this.loadCourse(courseId);
    this.loadLessons(courseId);
    this.checkPurchaseStatus(courseId);
  }

  private loadCourse(id: string): void {
    this.courseService.findOne(id).subscribe({
      next: (response) => {
        this.course = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load course:', error);
        this.errorMessage = 'Unable to load course.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private loadLessons(courseId: string): void {
    this.lessonService.findByCourse(courseId).subscribe({
      next: (response) => {
        this.lessons = response.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load lessons:', error);
      },
    });
  }

  private checkPurchaseStatus(courseId: string): void {
    this.dashboardService.getMyLearning().subscribe({
      next: (response) => {
        this.isPurchased = response.data.some((learning) => learning.course.id === courseId);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to check course access:', error);
      },
    });
  }

  getCourse(courseId: string): void {
    this.paymentService.createCourseCheckout(courseId).subscribe({
      next: (response) => {
        window.location.href = response.data.checkout_url;
      },
      error: (error) => {
        console.error('Failed to create checkout:', error);
      },
    });
  }
}
