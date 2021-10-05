import { expect } from 'chai';
import UserGender from '../../types/UserGender';
import validateUserGender from '../../validators/validateUserGender';

/* eslint-disable no-undef */
describe('Function: validateUserGender', () => {
  it('should throw error when gender is neither MASCULINE, FEMININE or OTHER', () => {
    const gender = null;
    expect(() => { validateUserGender(gender); }).to.throw('Gender is not valid');
  });

  it('should not throw error when gender is MASCULINE', () => {
    const gender = 'MASCULINE' as UserGender;
    expect(() => { validateUserGender(gender); }).not.to.throw();
  });

  it('should not throw error when gender is FEMININE', () => {
    const gender = 'FEMININE' as UserGender;
    expect(() => { validateUserGender(gender); }).not.to.throw();
  });

  it('should not throw error when gender is OTHER', () => {
    const gender = 'OTHER' as UserGender;
    expect(() => { validateUserGender(gender); }).not.to.throw();
  });
});
