import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from './../../../../models/task.model';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { addTask } from '../../state/tasks.actions';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  taskForm: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
  }>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      description: this.fb.nonNullable.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
    });
  }

  get getTaskFormControl(): {
    title: FormControl<string>;
    description: FormControl<string>;
  } {
    return this.taskForm.controls;
  }

  get getTaskFormIsValid(): boolean {
    return this.taskForm.valid;
  }

  get getTitleIsNotValid(): boolean {
    return (
      this.getTaskFormControl['title'].touched &&
      !this.getTaskFormControl['title'].valid
    );
  }

  get getDescriptionIsNotValid(): boolean {
    return (
      this.getTaskFormControl['description'].touched &&
      !this.getTaskFormControl['description'].valid
    );
  }

  showTitleErrors(): string | void {
    const titleForm = this.getTaskFormControl['title'];
    if (this.getTitleIsNotValid) {
      if (titleForm.getError('required')) {
        return 'Title is required';
      }
      if (titleForm.getError('minlength')) {
        return 'Title should be minimum 5 characters';
      }
    }
  }
  showDescriptionErrors(): string | void {
    const descriptionForm = this.getTaskFormControl['description'];
    if (this.getDescriptionIsNotValid) {
      if (descriptionForm.getError('required')) {
        return 'Description is required';
      }
      if (descriptionForm.getError('minlength')) {
        return 'Description should be minimum 10 characters';
      }
    }
  }

  onAddTask() {
    if (this.taskForm.valid) {
      const task: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isDone: false,
      };

      this.store.dispatch(addTask({ task }));
      this.router.navigate(['todo-tasks']);
    }
  }
}
