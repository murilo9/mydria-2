import mailjetService from 'node-mailjet';
import MailjetMessage from '../types/MailJetMessage';

export default async function sendMail(message: MailjetMessage): Promise<void> {
  const mailjet = mailjetService.connect(process.env.MAILJET_TOKEN_A, process.env.MAILJET_TOKEN_B);
  await mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        message,
      ],
    });
}
