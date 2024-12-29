import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

  export class LoginComponent {
    loginForm: FormGroup;
  
    authService = inject(AuthService);
  
    router = inject(Router)
isLoggedIn: any;
  
    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
    }

    onLogin() {
      // Check if the form is valid
      if (this.loginForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Form',
          text: 'Please enter your email and password correctly.',
          confirmButtonText: 'OK',
        });
        return;
      }
    
      const value = this.loginForm.value;
    
      this.authService.logInUser(value.email!, value.password!).subscribe({
        next: (result) => {

          this.launchFlowerSpray();
  
          console.log(result.data.token);
            
          localStorage.setItem("token", result.data.token)
          localStorage.setItem("user", JSON.stringify(result.data))
    
          Swal.fire({
            icon: 'success',
            title: 'Login Successful! 🌸',
            text: 'Welcome back! Redirecting to your dashboard...',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
        
            this.router.navigateByUrl(''); 
          });
        },
        error: (error) => {
          let errorMessage = 'Invalid credentials. Please try again.';
    
        
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
    
         
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMessage,
            confirmButtonText: 'Retry',
          });
    
          console.error(error); 
        },
      });
    }
    
  
    launchFlowerSpray() {
      const duration = 2500; // Duration of the animation
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

