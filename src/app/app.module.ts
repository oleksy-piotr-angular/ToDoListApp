import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module.ts.backup';
import { AppComponent } from './app.component';
import { AppMaterialModuleModule } from './material-module/material-module.module';
import { ToastrModule } from 'ngx-toastr';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { StoreModule } from '@ngrx/store';
import { ToDoTasksComponent } from './components/tasks/to-do-tasks/to-do-tasks.component';
import { DoneTasksComponent } from './components/tasks/done-tasks/done-tasks.component';
import { tasksReducer } from './components/tasks/state/tasks.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    ToDoTasksComponent,
    DoneTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModuleModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      disableTimeOut: true,
    }),
    StoreModule.forRoot({ tasks: tasksReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
