import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  taskService = inject(TaskService);

  tasks: any[] = [];

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getTasks().subscribe({
      next: (result: any) => {
        this.tasks = result;
      },
      error: (error) => {},
    });
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The task has been deleted.', 'success');
            this.getAllTask();
          },
          error: (err) => {
            console.error('Error deleting task:', err);
            Swal.fire(
              'Error!',
              'There was an error deleting the task.',
              'error'
            );
          },
        });
      }
    });
  }
}
