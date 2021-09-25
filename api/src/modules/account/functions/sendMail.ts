import mailjetService from 'node-mailjet';
import { MailjetMessage } from '../types';

export default async function sendMail(message: MailjetMessage) {
  const mailjet = mailjetService.connect(process.env.MAILJET_TOKEN_A, process.env.MAILJET_TOKEN_B);
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        message,
      ],
    });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}
