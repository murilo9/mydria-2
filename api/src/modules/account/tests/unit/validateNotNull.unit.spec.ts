import { expect } from 'chai';
import validateNotNull from '../../validators/validateNotNull';

/* eslint-disable no-undef */
describe('Function: validateNotNull', () => {
  it('should throw error when value is undefined', () => {
    let value;
    expect(() => { validateNotNull(value); }).to.throw('You must fulfill all fields accordingly');
  });

  it('should throw error when value is null', () => {
    const value = null;
    expect(() => { validateNotNull(value); }).to.throw('You must fulfill all fields accordingly');
  });

  it('should throw error when value is empty string', () => {
    const value = '';
    expect(() => { validateNotNull(value); }).to.throw('You must fulfill all fields accordingly');
  });
});
