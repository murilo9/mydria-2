/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: remove comment', () => {
  const { app } = new MydriaApp();
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

  xit('should remove comment', async () => {
    const { app } = new MydriaApp();
    const postId = 'noPostIdWasSetOnCurrentTest'
    const commentId = 'noCommentIdWasSetOnCurrentTest'
    const res = await chai.request(app)
      .delete(`/post/${postId}/comment/${commentId}`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(res).to.have.status(200);
  });
});
