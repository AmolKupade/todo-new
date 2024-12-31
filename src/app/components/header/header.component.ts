import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownVisible: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile') && this.dropdownVisible) {
      this.dropdownVisible = false;
    }
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  register(): void {
    this.router.navigateByUrl('/register');
  }

  logOut(): void {
    this.authService.userLogOut();
    this.router.navigateByUrl('/login');
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
