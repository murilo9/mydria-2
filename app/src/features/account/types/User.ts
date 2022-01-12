import UserGender from "./UserGender";

export default interface User {
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  country: string,
  birthDate: Date,
  gender: UserGender,
  bio: string,
  pictureUrl: string | null
}