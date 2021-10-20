import { ITask } from './../../interface';
import { TaskService } from './../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  editTask: FormGroup;
  id: string;
  // categoryId: string = '';

  task: ITask = {
    _id: '',
    title: '',
    task: '',
    content: '',
    deadline: new Date(),
    status: '',
    categoryId: '',
  };
  constructor(
    private TaskService: TaskService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.id = this.route.snapshot.params.id;

    this.editTask = this.fb.group({
      title: ['', Validators.required],
      task: ['', Validators.required],
      content: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  get fEdit() {
    return this.editTask.controls;
  }
  ngOnInit(): void {
    this.TaskService.getById(this.id).subscribe((data) => {
      this.task = data;
      console.log(this.task);
    });
  }
  handleEditTask(): void {
    this.TaskService.updateTask(this.id, this.task).subscribe((data) => {
      console.log(data);
      this.router.navigate([`/project/${this.task.categoryId}`]);
    });
  }
  back(): void {
    console.log('123');
    this.location.back();
  }
}
