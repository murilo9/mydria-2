import UserGender from './UserGender';

interface UserInput {
  firstName: string,
  lastName: string,
  email: string,
  city?: string,
  country?: string,
  birthDate: Date,
  gender: UserGender
}

export default UserInput;
