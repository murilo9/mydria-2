/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: remove post', () => {
  xit('should remove post', async () => {
    const { app } = new MydriaApp();
    const postId = '619ad4f672b9cba287bab359'
    const res = await chai.request(app)
      .delete(`/post/${postId}`).send();
    expect(res).to.have.status(200);
  });
});
