import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModuleModule } from './material-module/material-module.module';
import { ToastrModule } from 'ngx-toastr';
import { DoneTasksComponent } from './components/done-tasks/done-tasks.component';
import { ToDoTasksComponent } from './components/to-do-tasks/to-do-tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
@NgModule({
  declarations: [
    AppComponent,
    DoneTasksComponent,
    ToDoTasksComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModuleModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      disableTimeOut: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
