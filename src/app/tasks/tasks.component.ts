import { TaskService } from './../service/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  addTask: FormGroup;
  id: string;
  isChecked: Boolean = false;
  public tasks: ITask[] = [];
  constructor(
    private TaskService: TaskService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.id = this.route.snapshot.params.id;

    this.addTask = this.fb.group({
      title: ['', Validators.required],
      task: ['', Validators.required],
      content: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  get f() {
    return this.addTask.controls;
  }

  ngOnInit(): void {
    this.TaskService.getByCateId(this.id).subscribe((data) => {
      this.tasks = data;
    });
  }
  handleAddTask(): void {
    const newTask = { ...this.addTask.value, categoryId: this.id };
    this.TaskService.addTask(newTask).subscribe((data) => {
      this.tasks = data;
      this.toggleModal();
      this.reRender();
    });
  }
  handleRemove(title: string, id: string) {
    if (confirm('Bạn có muốn xóa task ' + title)) {
      this.TaskService.removeTask(id).subscribe((data) => {
        console.log(data);
        if (data) {
          console.log('ok');
          this.reRender();
        }
      });
    }
  }
  reRender(): void {
    this.TaskService.getByCateId(this.id).subscribe((data) => {
      this.tasks = data;
    });
  }
  toggleModal(): void {
    console.log(2);
    this.isChecked = !this.isChecked;
  }
  back(): void {
    console.log('123');
    this.location.back();
  }
}
