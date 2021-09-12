/* eslint-disable no-undef */
import writeLog from '../functions/writeLog';

describe('Function: writeLog', () => {
  it('should create the file', async () => {
    const content = {
      foo: 'bar',
      baz: 2,
    };
    await writeLog(content);
  });
});
