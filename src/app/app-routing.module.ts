import { EditProjectComponent } from './admin/edit-project/edit-project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthenticationGuard } from './auth/authentication.guard';
import { EditTaskComponent } from './admin/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'project/:id',
    component: TasksComponent,
    canActivate: [AuthenticationGuard],
  },
  // {
  //   path: 'task/add',
  //   component: TasksComponent,
  //   canActivate: [AuthenticationGuard],
  // },
  {
    path: 'task/edit/:id',
    component: EditTaskComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'project/edit/:id',
    component: EditProjectComponent,
    canActivate: [AuthenticationGuard],
  },
  // { path: '**', redirectTo: 'project', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
