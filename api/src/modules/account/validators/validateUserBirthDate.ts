export default function validateUserBirthDate(date: Date) {
  const minAge = 14;
  const now = new Date();
  if (now.getFullYear() - date.getFullYear() < minAge) {
    throw new Error('You must be 14 or older to sign up');
  }
}
