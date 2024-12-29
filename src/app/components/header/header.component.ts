import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownVisible: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.profile') && // Ensure the click isn't within the profile section
      this.dropdownVisible // Only close if dropdown is visible
    ) {
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
    // this.dropdownVisible = false; // Close dropdown on logout
  }

  
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }
}
