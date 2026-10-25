import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BookOpenCheck,
  Braces,
  ChartNoAxesColumnIncreasing,
  Check,
  Clock,
  CodeXml,
  Crown,
  GraduationCap,
  Laptop,
  ListCheck,
  LucideAngularModule,
  MousePointerClick,
  Plane,
  Rocket,
  Sparkles,
  TrendingUp,
} from 'lucide-angular';
import {
  siAngular,
  siCss,
  siDart,
  siDocker,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';
import { AuthService } from '../../../../core/services/auth';
import { PaymentService } from '../../../payments/services/payment';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly paymentService = inject(PaymentService);

  readonly ArrowRight = ArrowRight;
  readonly BookOpen = BookOpen;
  readonly CodeXml = CodeXml;
  readonly Play = Plane;
  readonly Sparkles = Sparkles;
  readonly BookOpenCheck = BookOpenCheck;
  readonly Clock = Clock;
  readonly ArrowUpRight = ArrowUpRight;
  readonly Braces = Braces;
  readonly ListChecks = ListCheck;
  readonly ChartNoAxesColumnIncreasing = ChartNoAxesColumnIncreasing;
  readonly Rocket = Rocket;
  readonly MousePointerClick = MousePointerClick;
  readonly GraduationCap = GraduationCap;
  readonly LaptopCode = Laptop;
  readonly TrendingUp = TrendingUp;
  readonly Check = Check;
  readonly Crown = Crown;

  // NEW: First technology row
  readonly technologiesRowOne = [
    { name: 'HTML', icon: siHtml5 },
    { name: 'CSS', icon: siCss },
    { name: 'JavaScript', icon: siJavascript },
    { name: 'TypeScript', icon: siTypescript },
    { name: 'Angular', icon: siAngular },
    { name: 'Tailwind CSS', icon: siTailwindcss },
    { name: 'Php', icon: siPhp },
    { name: 'Dart', icon: siDart },
  ];

  // NEW: Second technology row
  readonly technologiesRowTwo = [
    { name: 'Node.js', icon: siNodedotjs },
    { name: 'NestJS', icon: siNestjs },
    { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'MongoDB', icon: siMongodb },
    { name: 'Git', icon: siGit },
    { name: 'GitHub', icon: siGithub },
    { name: 'Docker', icon: siDocker },
    { name: 'MySQL', icon: siMysql },
  ];

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
