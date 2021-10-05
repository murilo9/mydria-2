import { expect } from 'chai';
import validateUserEmail from '../../validators/validateUserEmail';

/* eslint-disable no-undef */
describe('Function: validateUserEmail', () => {
  it('should throw error when email has nothing before @', () => {
    const email = '@gmail.com';
    expect(() => { validateUserEmail(email); }).to.throw('E-mail address is not valid');
  });

  it('should throw error when email has nothing after @', () => {
    const email = 'john@';
    expect(() => { validateUserEmail(email); }).to.throw('E-mail address is not valid');
  });

  it('should throw error when email has invalid domain', () => {
    const email = 'john@gmail';
    expect(() => { validateUserEmail(email); }).to.throw('E-mail address is not valid');
  });

  it('should not throw error when email is valid', () => {
    const email = 'valid.email@domain.com';
    expect(() => { validateUserEmail(email); }).not.to.throw();
  });
});
