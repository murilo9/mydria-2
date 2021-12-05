/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: update comment', () => {
  const { app } = new MydriaApp();
  const postId = 'noPostIdWasSetOnCurrentTest'
  const commentId = 'noCommentIdWasSetOnCurrentTest'
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

  xit('should update comment on post', async () => {
    const { app } = new MydriaApp();
    const postForm = {
      body: {
        text: 'This comment was edited successfully',
      },
    };
    const res = await chai.request(app)
      .put(`/post/${postId}/comment/${commentId}`)
      .set('x-access-token', xAccessToken)
      .send(postForm);
    expect(res).to.have.status(201);
  });
});
