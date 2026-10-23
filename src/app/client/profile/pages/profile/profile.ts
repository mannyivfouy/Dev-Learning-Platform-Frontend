import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../dashboard/services/dashboard';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { Student } from '../../../../shared/models/student.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxLength } from '@angular/forms/signals';
import { UpdateProfile } from '../../../../shared/models/update-profile.model';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService)
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  student: Student | null = null;
  isEditing = false;
  isSaving = false;

  editForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(20)]],
    avatar: [''],
    password: ['', [Validators.minLength(8)]],
    confirmPassword: [''],
  });

  ngOnInit(): void {
    this.loadStudent();
  }

  private loadStudent(): void {
    this.dashboardService.getProfile().subscribe({
      next: (response) => {
        this.student = response.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Profile error:', error);
      },
    });
  }

  startEditing(): void {
    if (!this.student) {
      return;
    }

    this.editForm.patchValue({
      fullname: this.student.fullname,
      username: this.student.username,
      email: this.student.email,
      phone: this.student.phone ?? '',

      // NEW
      avatar: this.student.avatar ?? '',

      password: '',
      confirmPassword: '',
    });

    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editForm.reset();
  }

  saveProfile(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const password = this.editForm.controls.password.value;
    const confirmPassword = this.editForm.controls.confirmPassword.value;

    // Check password confirmation
    if (password !== confirmPassword) {
      this.editForm.controls.confirmPassword.setErrors({
        passwordMismatch: true,
      });
      return;
    }

    const updateData: Partial<UpdateProfile> = {
      fullname: this.editForm.controls.fullname.value ?? '',
      username: this.editForm.controls.username.value ?? '',
      email: this.editForm.controls.email.value ?? '',
      phone: this.editForm.controls.phone.value ?? '',
      avatar: this.editForm.controls.avatar.value || null,
    };

    // Only send password when the student entered a new one
    if (password) {
      updateData.password = password;
    }

    this.isSaving = true;

    this.dashboardService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.student = response.data;
        this.isEditing = false;
        this.isSaving = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Update profile error:', error);
        this.isSaving = false;

        this.cdr.detectChanges();
      },
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // NEW
    this.dashboardService.uploadAvatar(file).subscribe({
      next: (response) => {
        this.student = response.data;
        this.authService.updateCurrentStudent(response.data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Avatar upload error:', error);
      },
    });
  }
}
