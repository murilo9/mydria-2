/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserGender from '../../types/UserGender';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: update user info', () => {
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

  xit('should update account info', async () => {
    const { app } = new MydriaApp();
    const updateUserInfoForm = {
      firstName: 'Billy',
      lastName: 'Ocean',
      password: 'billypass',
      city: 'New York',
      country: 'United States',
      birthDate: new Date('06-05-1962'),
      gender: UserGender.MASCULINE,
    };
    const res = await chai.request(app)
      .put('/user/me')
      .set('x-access-token', xAccessToken)
      .send(updateUserInfoForm);
    expect(res).to.have.status(200);
  });
});
