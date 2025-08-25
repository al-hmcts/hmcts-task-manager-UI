import { BaseClient } from './BaseClient';
import { TaskResponse } from '../models/responses/TaskResponse';
import { ApiError } from '../models/errors/ApiError';
import { TaskItem } from '../models/view/task-item';
import { ENDPOINTS } from './endpoits';

export class TaskClient extends BaseClient {
  async fetchTasks(): Promise<TaskItem[]> {
    try {
      const response = await this.client.get<TaskResponse[]>(ENDPOINTS.tasks);
      return response.data.map(TaskItem.fromResponse);
    } catch (error: any) {
      if (error.response) {
        throw new ApiError('API responded with error', error.response.status, error);
      }
      if (error.request) {
        throw new ApiError('No response from API', undefined, error);
      }
      throw new ApiError('Unexpected error fetching tasks', undefined, error);
    }
  }
}
