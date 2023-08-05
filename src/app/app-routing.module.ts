import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneTasksComponent } from './components/tasks/done-tasks/done-tasks.component';
import { ToDoTasksComponent } from './components/tasks/to-do-tasks/to-do-tasks.component';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: 'done-tasks',
    component: DoneTasksComponent,
  },
  {
    path: 'todo-tasks',
    component: ToDoTasksComponent,
    children: [
      { path: 'add', component: TaskFormComponent },
      { path: 'edit/:id', component: EditTaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
