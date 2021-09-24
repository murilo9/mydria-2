import { expect } from 'chai';
import validateUserName from '../../functions/validateUserName';

/* eslint-disable no-undef */
describe('Function: validateUserName', () => {
  it('should throw error when either firstName or lastName have less than 2 characters', () => {
    const firstName = 'a';
    const lastName = 'b';
    expect(() => { validateUserName(firstName, lastName); }).to.throw('Name is not valid');
  });

  it('should not throw error when either firstName and lastName have more than 2 characters', () => {
    const firstName = 'ab';
    const lastName = 'cd';
    expect(() => { validateUserName(firstName, lastName); }).not.to.throw('Name is not valid');
  });
});
