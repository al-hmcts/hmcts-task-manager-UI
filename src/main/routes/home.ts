import { Application } from 'express';
import { LoginClient } from '../api/LoginClient';

export default function (app: Application): void {
  const apiClient = new LoginClient('http://localhost:4000');

  app.get('/', async (req, res) => {
    try {
      const token = await apiClient.login({ username: 'admin', password: 'password' });
      (req.session as any).authToken = token;
      console.log('Logged in with session:', req.session, token);

    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }

  });
}
