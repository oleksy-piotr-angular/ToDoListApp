import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { AppState } from 'src/app/store/app.state';
import { getTaskById } from '../state/tasks.selector';
import { Subscription } from 'rxjs';
import { updateTask } from '../state/tasks.actions';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnDestroy {
  task: Task | undefined = undefined;

  taskForm!: FormGroup<{
    title: FormControl<string | undefined>;
    description: FormControl<string | undefined>;
  }>;

  taskSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.taskSubscription = this.store
        .select(getTaskById, { id })
        .subscribe((data) => {
          this.task = data;

          this.createForm();
        });
    });
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control<string | undefined>(
        this.task!.title,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      description: this.fb.nonNullable.control(
        this.task!.description,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }

  get getTaskFormControl(): {
    title: FormControl<string | undefined>;
    description: FormControl<string | undefined>;
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

  onEditTask() {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title;
      const description = this.taskForm.value.description;

      const task: Task = {
        id: this.task!.id,
        title,
        description,
        isDone: this.task?.isDone,
      };

      this.store.dispatch(updateTask({ task }));
      this.router.navigate(['todo-tasks']);
    }
  }
}
