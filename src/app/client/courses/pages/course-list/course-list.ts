import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';
import { Course } from '../../../../shared/models/course.model';
import { RouterLink } from '@angular/router';
import { ArrowUpRight, BookOpenCheck, Clock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly Clock = Clock
  readonly ArrowUpRight = ArrowUpRight
  readonly BookOpenCheck = BookOpenCheck

  courses: Course[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.findAll().subscribe({
      next: (response) => {
        this.courses = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load courses:', error);

        this.errorMessage = 'Unable to load courses. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
