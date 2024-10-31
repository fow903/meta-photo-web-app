import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode$: any;
  constructor() {
    this.initTheme();
  }

  initTheme(): void {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(prefersDark ? 'dark' : 'light');

    // Listen for changes in the system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.applyTheme(event.matches ? 'dark' : 'light');
    });
  }

  applyTheme(theme: string): void {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }
}
