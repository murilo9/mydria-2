/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: create comment', () => {
  xit('should create comment on post', async () => {
    const { app } = new MydriaApp();
    const postId = 'noPostIdWasSetOnCurrentTest'
    const userId = 'noUserIdWasSetOnCurrentTest'
    const postForm = {
      body: {
        text: 'This is a post',
      },
    };
    const res = await chai.request(app)
      .post(`/post/${postId}/${userId}`).send(postForm);
    expect(res).to.have.status(201);
  });
});
