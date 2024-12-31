import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
