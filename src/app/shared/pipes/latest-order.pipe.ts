import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Pipe({
  name: 'latestOrder',
})
export class LatestOrderPipe implements PipeTransform {
  transform(value: Task[]) {
    return [...value].reverse();
  }
}
