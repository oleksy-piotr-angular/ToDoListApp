import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public showSuccess(message: string, title: string): void {
    this.toastr.success(message, title + ' (click to hide)');
  }

  public showError(message: string, title: string): void {
    this.toastr.error(message, title + ' (click to hide)');
  }

  public showInfo(message: string, title: string): void {
    this.toastr.info(message, title + ' (click to hide)');
  }

  public showWarning(message: string, title: string): void {
    this.toastr.warning(message, title + ' (click to hide)');
  }
}
