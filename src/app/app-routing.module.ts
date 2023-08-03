import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'done-tasks',
    loadChildren: () =>
      import('./components/tasks/done-tasks/done-tasks.module').then(
        (m) => m.DoneTasksModule
      ),
  },
  {
    path: 'to-do-tasks',
    loadChildren: () =>
      import('./components/tasks/to-do-tasks/to-do-tasks.module').then(
        (m) => m.ToDoTasksModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
