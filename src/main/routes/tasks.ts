import { Application } from 'express';
import { TaskClient } from '../api/TaskClient';
import { TaskRequest } from '../models/request/TaskRequest';

export default function (app: Application): void {
  const apiClient = new TaskClient(process.env.API_URL || 'http://localhost:4000');

  // View all tasks
  app.get('/tasks', async (req, res, next) => {
    try {
      const tasks = await apiClient.fetchTasks();
      res.render('all-tasks', { items: tasks });
    } catch (err) {
      next(err); 
    }
  });

  // Add form (GET)
  app.get('/add-task', (req, res) => {
    res.render('add-task');
  });

  // Add form (POST)
  app.post('/add-task', async (req, res, next) => {
    try {
      const taskRequest = TaskRequest.fromForm(req.body);
      console.log(taskRequest);
      await apiClient.createTask(taskRequest);
  
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  });

  // Edit form (GET)
  app.get('/tasks/:id/edit', async (req, res, next) => {
    try {
      const task = await apiClient.fetchTaskById(Number(req.params.id));// returns TaskItem
      console.log(task);
      res.render('add-task', { task });
    } catch (err) {
      next(err);
    }
  });

  // Edit form (POST)
  app.post('/tasks/:id/edit', async (req, res, next) => {
    try {
      const taskRequest = TaskRequest.fromForm(req.body);
      await apiClient.updateTask(Number(req.params.id), taskRequest);
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  });

  // Delete confirmation page (GET)
  app.get('/tasks/:id/delete', async (req, res, next) => {
    try {
      const task = await apiClient.fetchTaskById(Number(req.params.id));
      res.render('delete-task', { task });
    } catch (err) {
      next(err);
    }
  });

  // Delete (POST)
  app.post('/tasks/:id/delete', async (req, res, next) => {
    try {
      await apiClient.deleteTask(Number(req.params.id));
      res.redirect('/tasks');
    } catch (err) {
      next(err);
    }
  });
}
