import { NgModule } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditTaskComponent],
  exports: [EditTaskComponent],
  imports: [SharedModule],
})
export class SharedComponentsModule {}
