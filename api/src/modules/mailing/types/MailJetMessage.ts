/**
 * MailJet service message object.
 */
type MailjetMessage = {
  From: {
    Email: string,
    Name: string,
  },
  To: Array<{
    Email: string,
    Name: string,
  }>,
  Subject: string,
  TextPart: string,
  HTMLPart: string
}

export default MailjetMessage;
