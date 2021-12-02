/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: create post', () => {
  const { app } = new MydriaApp();
  const userId = 'noUserIdWasSetForCurrentTest'
  let xAccessToken;

  before(async () => {
    const signinForm = {
      email: 'jane.doe@email.com',
      password: 'janepass123',
    }
    const loginRequest = await chai.request(app)
      .post('/signin').send(signinForm)
    xAccessToken = loginRequest.text;
  })

  xit('should create post', async () => {
    const postForm = {
      user: userId,
      body: {
        text: 'This is a post',
      },
    };
    const res = await chai.request(app)
      .post(`/user/${postForm.user}/posts`).set('x-access-token', xAccessToken).send(postForm);
    expect(res).to.have.status(201);
  });
});
