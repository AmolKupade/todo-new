import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../types/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  API_URL_TASK = 'http://localhost:8002/task/';
  http = inject(HttpClient);

  constructor() {}

  getTasks(): Observable<any[]> {
    return this.http.get<Task[]>(this.API_URL_TASK);
  }

  getTaskById(id: string) {
    return this.http.get<Task>(this.API_URL_TASK + id);
  }

  deleteTask(id: string) {
    return this.http.delete(this.API_URL_TASK + id);
  }

  addNewTask(name: any) {
    return this.http.post(this.API_URL_TASK, {
      name: name,
    });
  }

  updateTask(id: string, name: string) {
    return this.http.put(this.API_URL_TASK + id, {
      name: name,
    });
  }
}
