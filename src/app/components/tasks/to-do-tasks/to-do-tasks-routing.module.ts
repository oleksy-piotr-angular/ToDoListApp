import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoTasksComponent } from './to-do-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoTasksComponent,
    children: [
      { path: 'add', component: AddTaskComponent },
      { path: 'edit/:id', component: EditTaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoTasksRoutingModule {}
