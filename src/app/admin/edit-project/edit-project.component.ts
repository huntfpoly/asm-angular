import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/interface';
import { ProjectService } from 'src/app/service/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  editProject: FormGroup;

  project: IProject = {
    _id: '',
    title: '',
  };
  id: string;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.id = this.route.snapshot.params.id;
    this.editProject = this.fb.group({
      title: ['', Validators.required],
    });
  }
  get fEdit() {
    return this.editProject.controls;
  }
  ngOnInit(): void {
    this.projectService.getById(this.id).subscribe((data) => {
      this.project = data;
    });
  }
  handleEditProject(): void {
    this.projectService
      .updateProject(this.id, this.project)
      .subscribe((data) => {
        this.router.navigate([`/project`]);
      });
  }
  back(): void {
    console.log('123');
    this.location.back();
  }
}
