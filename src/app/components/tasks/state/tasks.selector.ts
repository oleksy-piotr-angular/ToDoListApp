import { TasksState } from './tasks.state';
import { createFeatureSelector } from '@ngrx/store';

const getTasksState = createFeatureSelector<TasksState>('tasks');
