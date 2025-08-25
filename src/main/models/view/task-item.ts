import { TaskResponse } from '../responses/TaskResponse';

export class TaskItem {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public dueDate: string,
    public createdDate: string,
  ) {}

  static fromResponse(task: TaskResponse): TaskItem {
    return new TaskItem(
      task.id,
      task.title || 'Untitled',
      task.description,
      task.due_date
        ? new Date(task.due_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'No due date',
      new Date(task.created_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    );
  }
}
