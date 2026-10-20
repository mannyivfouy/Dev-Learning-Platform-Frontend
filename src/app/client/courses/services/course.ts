import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Course } from '../../../shared/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.api_url}/courses`;

  findAll(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(this.apiUrl);
  }

  findOne(id: string): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/${id}`);
  }
}
