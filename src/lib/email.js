import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("sandboxcde3da5bb42b474f9e1c41135b73ce80.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandboxcde3da5bb42b474f9e1c41135b73ce80.mailgun.org>",
      to: ["Talha Bilal <m.talha.bilal.dev@gmail.com>"],
      subject: "Hello Talha Bilal",
      text: "Congratulations Talha Bilal, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export { sendSimpleMessage };