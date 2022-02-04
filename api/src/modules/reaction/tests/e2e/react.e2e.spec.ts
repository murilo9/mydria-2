/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: react to resource', () => {
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

  xit('should react to comment', async () => {
    const { app } = new MydriaApp();
    const postId = 'noCommentIdWasSetOnCurrentTest'
    const res = await chai.request(app)
      .post(`/post/${postId}/reactions/like`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(res.status).to.be.equal(200)
  });

  xit('should react to post', async () => {
    const { app } = new MydriaApp();
    const commentId = 'noPOstIdWasSetOnCurrentTest'
    const res = await chai.request(app)
      .post(`/comment/${commentId}/reactions/like`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(res.status).to.be.equal(200)
  });
});
