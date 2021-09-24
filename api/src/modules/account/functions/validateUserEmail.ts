export default function validateUserEmail(email: string) {
  const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (!emailIsValid) {
    throw new Error('E-mail address is not valid');
  }
}
