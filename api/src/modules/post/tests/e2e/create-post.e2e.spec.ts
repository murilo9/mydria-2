/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: create account', () => {
  xit('should create post', async () => {
    const { app } = new MydriaApp();
    const postForm = {
      user: 'noUserIdWasSetOnCurrentTest',
      body: {
        text: 'This is a post',
      },
    };
    const res = await chai.request(app)
      .post(`/user/${postForm.user}/posts`).send(postForm);
    expect(res).to.have.status(201);
  });
});
