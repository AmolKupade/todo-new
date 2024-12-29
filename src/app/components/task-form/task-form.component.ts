import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})


export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
    taskService = inject(TaskService);
  
    route = inject(ActivatedRoute);
  
    router = inject(Router);
  
    isEdit: boolean = false;

    tasks: any[] = [] ; 
  
    id!: any;
 
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    if (this.id) {
      this.isEdit = true;

    
      this.taskService.getTaskById(this.id).subscribe((result: any) => {
        console.log('Fetched Category:', result);

      
        this.taskForm.patchValue({
          task: result.name, 
        });
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form Submitted:', this.taskForm.value);
  
      this.taskService.addNewTask(this.task?.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Task added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigateByUrl('');
          });
        },
        error: (err) => {
          console.error('Error adding category:', err);
  
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add task. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  update() {
    this.taskService.updateTask(this.id, this.task?.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Task updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl('');
        });
      },
      error: (err) => {
        console.error('Error updating category:', err);
  
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update task. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  
  get task() {
    return this.taskForm.get('task');
  }
}

