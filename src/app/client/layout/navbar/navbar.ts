import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CodeXml, LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly Menu = Menu;
  readonly X = X;
  readonly CodeXml = CodeXml;

  isMenuOpen = false

  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen
  }

  closeMenu(): void{
    this.isMenuOpen = false
  }
}
