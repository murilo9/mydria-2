/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: update post', () => {
  xit('should update post', async () => {
    const { app } = new MydriaApp();
    const postId = 'noPostIdWasSetOnCurrentTest'
    const postToUpdate = {
      body: {
        text: 'This is an edited post',
        img: 'it now has an image url',
        link: 'and a link as well',
      },
    };
    const res = await chai.request(app)
      .put(`/post/${postId}`).send(postToUpdate);
    expect(res).to.have.status(201);
  });
});
