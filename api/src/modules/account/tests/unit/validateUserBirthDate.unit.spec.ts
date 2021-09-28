import { expect } from 'chai';
import validateUserBirthDate from '../../functions/validateUserBirthDate';

/* eslint-disable no-undef */
describe('Function: validateUserBirthDate', () => {
  it('should throw error when user is less than 14 years old', () => {
    const birthDate = new Date();
    expect(() => { validateUserBirthDate(birthDate); }).to.throw('You must be 14 or older to sign up');
  });

  it('should not throw error when user is more than 14 years old', () => {
    const birthDate = new Date();
    birthDate.setFullYear(new Date().getFullYear() - 14);
    expect(() => { validateUserBirthDate(birthDate); }).not.to.throw();
  });
});
