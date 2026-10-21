import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Lesson } from '../../../shared/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.api_url}/lessons`;

  findByCourse(courseId: string): Observable<ApiResponse<Lesson[]>> {
    return this.http.get<ApiResponse<Lesson[]>>(`${this.apiUrl}/course/${courseId}`);
  }

  findOne(id: string): Observable<ApiResponse<Lesson>> {
    return this.http.get<ApiResponse<Lesson>>(`${this.apiUrl}/${id}`);
  }
}
