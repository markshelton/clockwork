const nodemailer = require("nodemailer");
const EmailTemplates = require("swig-email-templates");

const mailConfig =
  process.env.NODE_ENV === "production"
    ? {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE || false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      }
    : {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "x3mrsq6aio7bues7@ethereal.email",
          pass: "kcyXtKxD73cqq6KD8V"
        }
      };

const transporter = nodemailer.createTransport(mailConfig);
const templates = new EmailTemplates();

exports.sendPasswordReset = function(user, token) {
  const source = "../templates/reset_password.html";
  const context = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    tokenURL: `${process.env.SERVER_HOST}\password\${token}`
  };
  sendFunction = function(err, html, text, subject) {
    transporter.sendMail(
      {
        from: "Clockwork <service@clockwork.com>",
        subject: "Clockwork: Reset Password",
        to: `${user.first_name} ${user.last_name}<${user.email}>`,
        html,
        text
      },
      function(err, info) {
        if (err) throw err;
        else console.log("Link sent\n" + JSON.stringify(info));
      }
    );
  };
  templates.render(source, context, sendFunction);
};

module.exports = transporter;
