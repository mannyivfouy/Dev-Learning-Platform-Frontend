import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef)

  readonly Eye = Eye
  readonly EyeOff = EyeOff

  identifier = '';
  password = '';
  showPassword = false
  isLoading = false;
  errorMessage = '';

  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login({
        identifier: this.identifier,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);

          this.errorMessage = error?.error?.message ?? 'Invalid username/email or password.';

          this.isLoading = false;
          this.cdr.detectChanges()
        },
      });
  }


}
