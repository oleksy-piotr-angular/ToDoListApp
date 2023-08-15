import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './shared/shared.selector';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ToDo List App';
  showLoading!: Observable<boolean>;
  errorMessage!: Subscription;

  constructor(
    private store: Store<AppState>,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store
      .select(getErrorMessage)
      .subscribe((errMessage) => {
        if (errMessage) {
          this.notification.showError(errMessage, 'Error');
        }
      });
  }
  ngOnDestroy(): void {
    if (this.errorMessage) {
      this.errorMessage.unsubscribe();
    }
  }
}
