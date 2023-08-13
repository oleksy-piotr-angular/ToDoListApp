import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneTasksComponent } from './done-tasks.component';
import { EditTaskComponent } from './../edit-task/edit-task.component';
import { ChangingStatusComponent } from '../changing-status/changing-status.component';

const routes: Routes = [
  {
    path: '',
    component: DoneTasksComponent,
    children: [
      { path: 'edit/:id', component: EditTaskComponent },

      {
        path: 'status-change/:id',
        component: ChangingStatusComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneTasksRoutingModule {}
