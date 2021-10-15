/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MydriaApp from './App';
import UserGender from './modules/account/types/UserGender';

chai.use(chaiHttp);

describe('Test', () => {
  it('should work', async () => {
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
