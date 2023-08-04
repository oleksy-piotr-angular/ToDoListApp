import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppMaterialModuleModule } from './material-module/material-module.module';
import { ToastrModule } from 'ngx-toastr';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToDoTasksComponent } from './components/tasks/to-do-tasks/to-do-tasks.component';
import { DoneTasksComponent } from './components/tasks/done-tasks/done-tasks.component';
import { tasksReducer } from './components/tasks/state/tasks.reducer';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    ToDoTasksComponent,
    DoneTasksComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModuleModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      disableTimeOut: true,
    }),
    StoreModule.forRoot({ tasks: tasksReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
