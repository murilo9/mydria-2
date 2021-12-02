/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: create comment', () => {
  const { app } = new MydriaApp();
  const postId = 'noPostIdWasSetForCurrentTest'
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

  xit('should create comment on post', async () => {
    const { app } = new MydriaApp();
    const postForm = {
      body: {
        text: 'Hmmmm THIS is an interesting post!',
      },
    };
    const res = await chai.request(app)
      .post(`/post/${postId}/comments`)
      .set('x-access-token', xAccessToken)
      .send(postForm);
    expect(res).to.have.status(201);
  });
});
