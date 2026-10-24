import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CheckoutResponse } from '../../../shared/models/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = `${environment.api_url}/payments`

  createCourseCheckout(courseId: string): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(
      `${this.apiUrl}/checkout/course/${courseId}`,
      {},
    );
  }
}
