import { BaseClient } from './BaseClient';
import { TaskResponse } from '../models/responses/TaskResponse';
import { TaskItem } from '../models/view/task-item';
import { ENDPOINTS } from './endpoits';
import { TaskRequest } from '../models/request/TaskRequest';

export class TaskClient extends BaseClient {
  async fetchTasks(): Promise<TaskItem[]> {
    try {
      const response = await this.client.get<TaskResponse[]>(ENDPOINTS.tasks);
      return response.data.map(TaskItem.fromResponse);
    } catch (error: any) {
      throw this.formatError(error, 'Failed to fetch tasks');
    }
  }

  async fetchTaskById(id: number): Promise<TaskItem> {
    try {
      const response = await this.client.get<TaskResponse>(`${ENDPOINTS.tasks}/${id}`);
      return TaskItem.fromResponse(response.data);
    } catch (error: any) {
      throw this.formatError(error, `Failed to fetch task with id=${id}`);
    }
  }

  async createTask(task: TaskRequest): Promise<number> {
    try {
      const response = await this.client.post<number>(ENDPOINTS.tasks, task);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw this.formatError(error, 'Failed to create task');
    }
  }

  async updateTask(id: number, task: Partial<TaskResponse>): Promise<TaskItem> {
    try {
      const response = await this.client.put<TaskResponse>(`${ENDPOINTS.tasks}/${id}`, task);
      return TaskItem.fromResponse(response.data);
    } catch (error: any) {
      throw this.formatError(error, `Failed to update task with id=${id}`);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.client.delete(`${ENDPOINTS.tasks}/${id}`);
    } catch (error: any) {
      throw this.formatError(error, `Failed to delete task with id=${id}`);
    }
  }
}
