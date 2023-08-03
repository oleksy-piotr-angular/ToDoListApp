import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ToDoListApp';
  constructor(notification: NotificationService) {
    notification.showInfo('Works', 'Toastr Works');
    notification.showSuccess('Works', 'Toastr Works');
    notification.showWarning('Works', 'Toastr Works');
    notification.showError('Works', 'Toastr Works');
  }
}
