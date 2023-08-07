import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getErrorMessage(message: string) {
    switch (message) {
      case 'ERROR_TEST':
        return 'Error test..';
      default:
        return 'unknown error.';
    }
  }
}
