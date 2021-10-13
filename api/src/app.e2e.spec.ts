/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from './App';

chai.use(chaiHttp);

describe('Test', () => {
  it('should work', async () => {
    const { app } = new MydriaApp();
    const res = await chai.request(app)
      .get('/stuff').send();
    expect(res).to.have.status(200);
    expect(res.text).to.be.equal('some stuff');
  });
});
