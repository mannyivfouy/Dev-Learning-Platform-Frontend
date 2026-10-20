import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../../../shared/models/course.model';
import { ArrowLeft, BookOpenCheck, Clock, CodeXml, CreditCard, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-course-detail',
  imports: [LucideAngularModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly BookOpenCheck = BookOpenCheck;
  readonly Clock = Clock;
  readonly CodeXml = CodeXml;
  readonly CreditCard = CreditCard;

  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly cdr = inject(ChangeDetectorRef);

  course: Course | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (!courseId) {
      this.errorMessage = 'Course not found.';
      this.isLoading = false;
      return;
    }

    this.loadCourse(courseId);
  }

  private loadCourse(id: string): void {
    this.courseService.findOne(id).subscribe({
      next: (response) => {
        this.course = response.data;
        this.isLoading = false;

        // Keep this because your current Angular setup needs it
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
}
