import { statusEnum } from "../../models/statusEnum";

export interface ValidationError {
  text: string;
  href: string;
}

export class TaskRequest {
  public title: string;
  public description: string;
  public status: statusEnum; 
  public due_date: string;
  public errors: ValidationError[] = [];

  constructor(title: string, description: string, status: statusEnum, due_date: string) {
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.status = status;
  }

  static fromForm(form: any): TaskRequest {
    const { title, description, status } = form;
    const day = form['dueDate-day'];
    const month = form['dueDate-month'];
    const year = form['dueDate-year'];

    let dueDate: string | undefined;
    if (day && month && year) {
      dueDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T00:00:00`;
    }

    const req = new TaskRequest(title, description, status, dueDate || '');

    // --- Validation rules ---
    if (!title || title.trim().length === 0) {
      req.errors.push({text: "Enter a task title",  href: "#title"});
    }
    if (!description || description.trim().length === 0) {
      req.errors.push({ text: "Enter a task description", href: "#description", });
    }
    if (!status) {
      req.errors.push({ text: "Select a status",  href: "#status", });
    }
    if (!day || !month || !year) {
      req.errors.push({ text: "Enter a complete due date", href: "#dueDate", });
    }

    return req;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}



