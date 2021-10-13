/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from './App';

chai.use(chaiHttp);

describe('Test', () => {
  it('should work req1', async () => {
    const { app } = new MydriaApp();
    const req1 = chai.request(app)
      .get('/test').send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.equal('works!!!');
      });
  });

  it('should work req2', async () => {
    const { app } = new MydriaApp();
    const req2 = chai.request(app)
      .post('/foo').send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.equal('bar');
      });
  });
});
