import { Component, inject } from '@angular/core';
import { ArrowRight, BookOpen, Check, Crown, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth';
import { PaymentService } from '../../../payments/services/payment';

@Component({
  selector: 'app-pricing',
  imports: [LucideAngularModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  private readonly authService = inject(AuthService)
  private readonly paymentService = inject(PaymentService)

  readonly Crown = Crown
  readonly Check = Check
  readonly ArrowRight = ArrowRight
  readonly BookOpen = BookOpen

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  startSubscriptionCheckout(): void {
    this.paymentService.createSubscriptionCheckout().subscribe({
      next: (response) => {
        window.location.href = response.data.checkout_url;
      },
      error: (error) => {
        console.error('Failed to create subscription checkout:', error);
      },
    });
  }
}
