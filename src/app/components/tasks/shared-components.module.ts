import { NgModule } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EditTaskComponent],
  exports: [EditTaskComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
  ],
})
export class SharedComponentsModule {}
