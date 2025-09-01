import { app } from '../../main/app';
import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { LoginClient } from '../../main/api/LoginClient';

describe('Login', () => {
  let loginClientStub: sinon.SinonStub;

  beforeEach(() => {
    // Stub the LoginClient's login method
    loginClientStub = sinon.stub(LoginClient.prototype, 'login');
  });

  afterEach(() => {
    // Restore the original method
    sinon.restore();
  });

  describe('on GET /', () => {
    test('should return login base page', async () => {
      await request(app)
        .get('/')
        .expect(res => expect(res.status).to.equal(200));
    });
  });

  describe('on POST /login', () => {
    test('should call login API and redirect to tasks', async () => {
      // Mock the login method to return a fake token
      loginClientStub.resolves('fake-auth-token');

      await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'password' })
        .expect(res => {
          expect(res.status).to.equal(302); // Expect redirect
          expect(res.headers.location).to.equal('/tasks'); // Expect redirect to /tasks
        });

      // Verify that the login method was called with the correct arguments
      sinon.assert.calledOnceWithExactly(loginClientStub, { username: 'admin', password: 'password' });
    });

    test('should render home page on login failure', async () => {
      // Mock the login method to throw an error
      loginClientStub.rejects(new Error('Invalid credentials'));

      await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'wrong-password' })
        .expect(res => {
          expect(res.status).to.equal(200); // Expect the home page to render
        });

      // Verify that the login method was called
      sinon.assert.calledOnce(loginClientStub);
    });
  });
});