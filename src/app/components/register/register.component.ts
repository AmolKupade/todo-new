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
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 
    fb = inject(FormBuilder)
    authService = inject(AuthService)
    router = inject(Router)
    
    registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name is required and must be at least 3 characters
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email
      password: ['', [Validators.required, Validators.minLength(4)]], // Password is required and must be at least 6 characters
    
    })

    openLogin(){
      window.scrollTo(0, 0);
      this.router.navigateByUrl('login')
    }

    onRegister() {
      // Check if the form is valid
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
    
      // Call AuthService to register the user
      this.authService.registerNewUser(value.name!, value.email!, value.password!).subscribe({
        next: () => {
          // Fireworks and Flowers Effect
          this.launchFlowerSpray();
          window.scrollTo(0, 0);
    
          // Success message after registration
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
    
          // Check if the error response has a message from the backend
          if (error.error && error.error.error) {
            errorMessage = error.error.error; // Use the backend error message
          }
    
          // Show SweetAlert2 with the error message
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMessage,
            confirmButtonText: 'Retry',
          });
    
          console.error(error); // Log the error for debugging
        },
      });
    }
    
    
    launchFlowerSpray() {
      const duration = 2000; // Duration of the animation
      const end = Date.now() + duration;
    
      (function frame() {
        confetti({
          particleCount: 5, // Number of particles per frame
          angle: 60, // Left spray angle
          spread: 55, // Spread of particles
          origin: { x: 0 }, // Starting point (left)
          shapes: ['circle'], // Particle shapes
          colors: ['#FF69B4', '#FFD700', '#32CD32', '#FF6347', '#87CEEB'], // Flower-like colors
        });
        confetti({
          particleCount: 5, // Number of particles per frame
          angle: 120, // Right spray angle
          spread: 55, // Spread of particles
          origin: { x: 1 }, // Starting point (right)
          shapes: ['circle'],
          colors: ['#FF69B4', '#FFD700', '#32CD32', '#FF6347', '#87CEEB'],
        });
    
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
    
    }

