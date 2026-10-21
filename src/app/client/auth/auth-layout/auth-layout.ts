import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArrowRight, CodeXml, LaptopMinimalCheck, LucideAngularModule, Rocket } from 'lucide-angular';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, RouterOutlet, LucideAngularModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  readonly CodeXml = CodeXml
  readonly LaptopMinimalCheck = LaptopMinimalCheck
  readonly Rocket = Rocket
  readonly ArrowRight = ArrowRight
}
