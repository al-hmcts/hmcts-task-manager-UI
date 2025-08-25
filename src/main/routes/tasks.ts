import { Application } from 'express';
import { TaskClient } from '../api/TaskClient';

export default function (app: Application): void {
  const apiClient = new TaskClient(process.env.API_URL || 'http://localhost:4000');

  app.get('/tasks', async (req, res, next) => {
    try {
      const tasks = await apiClient.fetchTasks();
      console.log('Fetched tasks:', tasks);
      res.render('all-tasks', { items: tasks });
    } catch (err) {
      next(err); // Let global error handler manage it
    }
  });
}
