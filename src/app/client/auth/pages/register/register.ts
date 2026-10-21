import { Component, inject } from '@angular/core';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  fullname = '';
  username = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  isLoading = false;
  errorMessage = '';

  register(): void {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register({
        fullname: this.fullname,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Registration failed:', error);

          this.errorMessage = error?.error?.message ?? 'Unable to create your account.';

          this.isLoading = false;
        },
      });
  }
}
