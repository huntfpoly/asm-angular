import { ProjectService } from '../service/project.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  addProject: FormGroup;
  isChecked: Boolean = false;
  useId: string = '';
  projects: IProject[] = [];
  constructor(
    private ProjectService: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    const userLocal = localStorage.getItem('user');

    if (userLocal) {
      const { _id } = JSON.parse(userLocal);
      this.useId = _id;
    }
    this.addProject = this.fb.group({
      title: ['', Validators.required],
    });
  }
  get f() {
    return this.addProject.controls;
  }
  ngOnInit(): void {
    if (this.useId) {
      this.ProjectService.getByUserId(this.useId).subscribe((data) => {
        console.log(data);
        this.projects = data;
      });
    }
  }
  handleAddProject(): void {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const { _id } = JSON.parse(userLocal);

      const newTask = { ...this.addProject.value, userId: _id };
      console.log(newTask);

      this.ProjectService.add(newTask).subscribe((data) => {
        console.log(data);
        this.projects = data;
        this.toggleModal();
        this.reRender();
      });
    }
  }
  toggleModal(): void {
    console.log(2);
    this.isChecked = !this.isChecked;
  }

  handleRemove(title: string, id: string): void {
    if (confirm('Bạn có muốn xóa project ' + title)) {
      this.ProjectService.removeProject(id).subscribe((data) => {
        this.reRender();
      });
    }
  }
  reRender(): void {
    this.ProjectService.getByUserId(this.useId).subscribe((data) => {
      this.projects = data;
    });
  }
}
