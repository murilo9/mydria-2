export default function validateUserName(firstName: string, lastName: string) {
  if (firstName.length < 2 || lastName.length < 2) {
    throw new Error('Name is not valid');
  }
}
