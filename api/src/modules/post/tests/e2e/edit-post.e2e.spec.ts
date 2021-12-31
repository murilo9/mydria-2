/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: update post', () => {
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

  xit('should update post', async () => {
    const { app } = new MydriaApp();
    const postId = 'noPostIdWasSetOnCurrentTest'
    const postToUpdate = {
      body: {
        text: 'This is an edited post',
        img: 'it now has an image url',
        link: 'and a link as well',
      },
      tags: ['DifferentTagThisTime'],
    };
    const res = await chai.request(app)
      .put(`/post/${postId}`)
      .set('x-access-token', xAccessToken)
      .send(postToUpdate);
    expect(res).to.have.status(201);
  });
});
