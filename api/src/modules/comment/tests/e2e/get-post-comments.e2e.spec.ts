/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: get post comments', () => {
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

  xit('should get post comments', async () => {
    const { app } = new MydriaApp();
    const postId = 'noPostIdWasSetOnCurrentTest'
    const res = await chai.request(app)
      .get(`/post/${postId}/comments`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(res).to.have.status(200);
  });
});
