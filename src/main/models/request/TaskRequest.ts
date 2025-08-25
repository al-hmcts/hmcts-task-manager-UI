import { statusEnum } from "../../models/statusEnum";

export class TaskRequest {
  public title: string;
  public description: string;
  public status: statusEnum; 
  public due_date: string;

  constructor(title: string, description: string, status: statusEnum, due_date: string) {
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.status = status;
  }

  static fromForm(form: any): TaskRequest {
    const { title, description } = form;
    const day = form['dueDate-day'];
    const month = form['dueDate-month'];
    const year = form['dueDate-year'];

    let dueDate: string | undefined;
    if (day && month && year) {
      dueDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T00:00:00`;
    }

    console.log("TaskRequest.fromForm:", {title, description, dueDate});

    return new TaskRequest(title, description, statusEnum.IN_PROGRESS ,dueDate || '');
  }
}



