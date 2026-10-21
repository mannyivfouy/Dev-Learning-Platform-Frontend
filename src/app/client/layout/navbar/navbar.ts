import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  BookOpen,
  ChevronDown,
  CodeXml,
  LayoutDashboard,
  LogOut,
  LucideAngularModule,
  Menu,
  User,
  X,
} from 'lucide-angular';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly Menu = Menu;
  readonly X = X;
  readonly CodeXml = CodeXml;
  readonly BookOpen = BookOpen;
  readonly ChevronDown = ChevronDown;
  readonly LayoutDashboard = LayoutDashboard;
  readonly LogOut = LogOut;
  readonly User = User;

  isMenuOpen = false;
  isProfileOpen = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentStudent() {
    return this.authService.getCurrentStudent();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  closeProfile(): void {
    this.isProfileOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isProfileOpen = false;
    this.isMenuOpen = false;

    this.router.navigate(['/']);
  }
}
