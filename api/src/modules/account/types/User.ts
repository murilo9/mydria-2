import PersistentEntity from '../../system/types/PersistentEntity';
import UserGender from './UserGender';

interface User extends PersistentEntity {
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  country: string,
  birthDate: Date,
  gender: UserGender
}

export default User;
