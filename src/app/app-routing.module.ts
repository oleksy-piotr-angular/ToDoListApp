import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleTaskComponent } from './components/tasks/single-task/single-task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'done-tasks',
    loadChildren: () =>
      import('./components/tasks/done-tasks/done-tasks.module').then(
        (m) => m.DoneTasksModule
      ),
  },
  {
    path: 'todo-tasks',
    loadChildren: () =>
      import('./components/tasks/to-do-tasks/to-do-tasks.module').then(
        (m) => m.ToDoTasksModule
      ),
  },
  {
    path: 'todo-tasks/details/:id',
    component: SingleTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
