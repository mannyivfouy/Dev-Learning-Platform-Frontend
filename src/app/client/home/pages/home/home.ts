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

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly authService = inject(AuthService);

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
    { name: 'MySQL', icon: siMysql }
  ];

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  courses = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description:
        'Learn the fundamentals of Angular and build modern, responsive web applications.',
      level: 'Beginner',
      lessons: 18,
      duration: '8 hours',
      category: 'Frontend',
      icon: 'A',
    },
    {
      id: 2,
      title: 'NestJS Backend Development',
      description: 'Build scalable REST APIs using NestJS, TypeScript, PostgreSQL, and TypeORM.',
      level: 'Intermediate',
      lessons: 24,
      duration: '12 hours',
      category: 'Backend',
      icon: 'N',
    },
    {
      id: 3,
      title: 'TypeScript Essentials',
      description:
        'Strengthen your TypeScript knowledge and write safer, cleaner application code.',
      level: 'Beginner',
      lessons: 16,
      duration: '6 hours',
      category: 'Programming',
      icon: 'TS',
    },
  ];
}
