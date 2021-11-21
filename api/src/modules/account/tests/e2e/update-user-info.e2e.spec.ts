/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserGender from '../../types/UserGender';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: update user info', () => {
  const userId = 'noUserIdWasSetOnCurrentTest';

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
      .put(`/user/${userId}`).send(updateUserInfoForm);
    expect(res).to.have.status(200);
  });
});
