/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserGender from '../../types/UserGender';
import MydriaApp from '../../../../App';

chai.use(chaiHttp);

describe('Flow: create account', () => {
  xit('should create account', async () => {
    const { app } = new MydriaApp();
    const signUpForm = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@email.com',
      password: 'janepass123',
      city: 'Machester',
      country: 'United Kingdom',
      birthDate: new Date('06-08-1996'),
      gender: UserGender.FEMININE,
    };
    const res = await chai.request(app)
      .post('/signup').send(signUpForm);
    expect(res).to.have.status(201);
    expect(res.text).to.be.equal('Account created successfully');
  });
});
