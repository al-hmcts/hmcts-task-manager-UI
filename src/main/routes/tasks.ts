import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.get('/tasks', async (req, res) => {
    try {
      // Fetch data from the backend
      const response = await axios.get('http://localhost:4000/api/tasks');

      console.log('API response data:', response.data); // Log the raw response data
      
      // Transform the data to a list of items
      const tasks = response.data.map((task: any) => ({
        id: task.id,
        title: task.title || 'Untitled', // Default to 'Untitled' if title is empty
        description: task.description,
        dueDate: new Date(task.created_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }));

      console.log('Transformed tasks:', tasks); // Log the transformed tasks


      // Pass the transformed data to the Nunjucks template
      res.render('all-tasks', { items: tasks });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('all-tasks', { items: [] }); // Pass an empty list in case of error
    }
  });
}
