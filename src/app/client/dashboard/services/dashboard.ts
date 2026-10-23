import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Student } from '../../../shared/models/student.model';
import { LessonProgress } from '../../../shared/models/lesson-progress.model';
import { Enrollment } from '../../../shared/models/enrollment.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = `${environment.api_url}`

  getProfile(): Observable<ApiResponse<Student>> {
    return this.http.get<ApiResponse<Student>>(
      `${this.apiUrl}/students/profile`,
    );
  }

  getEnrollments(): Observable<ApiResponse<Enrollment[]>> {
    return this.http.get<ApiResponse<Enrollment[]>>(
      `${this.apiUrl}/enrollments/me`,
    );
  }

  getLessonProgress(): Observable<ApiResponse<LessonProgress[]>> {
    return this.http.get<ApiResponse<LessonProgress[]>>(
      `${this.apiUrl}/lesson-progress/me`,
    );
  }
}
