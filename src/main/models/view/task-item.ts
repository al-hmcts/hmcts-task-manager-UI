
import { TaskResponse } from '../responses/TaskResponse';

export class TaskItem {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public dueDate: string, 
    public status: string,
    public createdDate: string,   
    public dueDateParts: { day: string; month: string; year: string } // For form inputs
  ) {}

  static fromResponse(task: TaskResponse): TaskItem {
    let dueDateParts = { day: '', month: '', year: '' };

    const date = new Date(task.due_date);
    dueDateParts = {
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    };

    let dueDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const createdDate = new Date(task.created_date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return new TaskItem(
      task.id,
      task.title || 'Untitled',
      task.description,
      dueDate, 
      task.status,
      createdDate,
      dueDateParts
    );
  }
}
