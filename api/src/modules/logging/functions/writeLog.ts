import fs from 'fs';

const dir = 'logs';
/**
 * Logs an object in JSON format.
 * @param error
 */
export default async function writeLog(payload: { [key: string]: any }): Promise<void> {
  return new Promise((resolve) => {
    // Creates the folder if it does not exist
    if (!fs.existsSync(`./${dir}`)) {
      fs.mkdirSync(`./${dir}`);
    }
    // Builds the log
    const today = new Date().toISOString().substr(0, 10);
    const content = {
      logTime: new Date(),
      payload,
    };
    const contentJSON = `${JSON.stringify(content)}\n`;
    // Write the file
    fs.appendFile(`${dir}/${today}.log`, contentJSON, (err) => {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
}
