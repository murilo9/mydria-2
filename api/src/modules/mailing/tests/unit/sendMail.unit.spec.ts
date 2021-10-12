import sendMail from '../../domain/sendMail';

/* eslint-disable no-undef */
describe('Function: sendMail', () => {
  xit('should send mail', async () => {
    const message = {
      From: {
        Email: process.env.SYSTEM_EMAIL_ADDRESS,
        Name: 'Mydria Social',
      },
      To: [
        {
          Email: 'murilohenriquematias@gmail.com',
          Name: 'Murilo Henrique',
        },
      ],
      Subject: 'Confirm your sign up',
      TextPart: 'Hello Murilo Henrique, click the link bellow to confir your registration on Mydria.',
      HTMLPart: '<a href="https://mydria.app">Confirm Sign Up</a>',
    };
    await sendMail(message);
  });
});
