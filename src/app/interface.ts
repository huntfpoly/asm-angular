export interface IProject {
  _id: string;
  title: string;
}
export interface ITask {
  _id: string | undefined;
  title: string;
  task: string;
  content: string;
  deadline: Date;
  status: string;
  categoryId: string;
}
export interface IUser {
  _id: string;
  title: string;
  task: string;
  content: string;
  deadline: Date;
  status: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
