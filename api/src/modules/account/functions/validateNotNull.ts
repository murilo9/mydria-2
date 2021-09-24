export default function validateNotNull(value: any) {
  if (value === null || value === undefined || value === '') {
    throw new Error('You must fulfill all fields accordingly');
  }
}
