import { UserGender } from '../types';

export default function validateUserGender(gender: any) {
  if (gender !== UserGender.MASCULINE && gender !== UserGender.FEMININE && gender !== UserGender.OTHER) {
    throw new Error('Gender is not valid');
  }
}
