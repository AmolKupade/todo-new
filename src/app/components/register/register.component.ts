import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  openLogin() {
    window.scrollTo(0, 0);
    this.router.navigateByUrl('login');
  }

  onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill all fields correctly before submitting.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const value = this.registerForm.value;

    this.authService
      .registerNewUser(value.name!, value.email!, value.password!)
      .subscribe({
        next: () => {
          this.launchFlowerSpray();
          window.scrollTo(0, 0);

          Swal.fire({
            icon: 'success',
            title: 'Registration Successful! 🌸',
            text: 'Welcome to the family! Redirecting to login...',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigateByUrl('login');
          });
        },
        error: (error) => {
          let errorMessage = 'Something went wrong. Please try again.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMessage,
            confirmButtonText: 'Retry',
          });

          console.error(error);
        },
      });
  }

  launchFlowerSpray() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ['circle'],
        colors: ['#FF69B4', '#FFD700', '#32CD32', '#FF6347', '#87CEEB'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ['circle'],
        colors: ['#FF69B4', '#FFD700', '#32CD32', '#FF6347', '#87CEEB'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
