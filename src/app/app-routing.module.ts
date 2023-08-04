import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneTasksComponent } from './components/tasks/done-tasks/done-tasks.component';
import { ToDoTasksComponent } from './components/tasks/to-do-tasks/to-do-tasks.component';

const routes: Routes = [
  {
    path: 'done-tasks',
    component: DoneTasksComponent,
  },
  {
    path: 'to-do-tasks',
    component: ToDoTasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
