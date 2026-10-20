import { Component } from '@angular/core';
import { CodeXml, Github, LucideAngularModule } from 'lucide-angular';
import { GithubIcon } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly CodeXml = CodeXml;
  readonly Github = Github;

  readonly currentYear = new Date().getFullYear();
}
