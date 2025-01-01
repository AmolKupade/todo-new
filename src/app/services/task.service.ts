import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../types/task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(): Observable<any[]> {
    return this.http.get<Task[]>(environment.API_URL_TASK);
  }

  getTaskById(id: string) {
    return this.http.get<Task>(environment.API_URL_TASK + id);
  }

  deleteTask(id: string) {
    return this.http.delete(environment.API_URL_TASK + id);
  }

  addNewTask(name: any) {
    return this.http.post(environment.API_URL_TASK, {
      name: name,
    });
  }

  updateTask(id: string, name: string) {
    return this.http.put(environment.API_URL_TASK + id, {
      name: name,
    });
  }
}
