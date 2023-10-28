const nodemailer = require("nodemailer");

const { NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("Nodemailer funcionando");
});

module.exports = { transporter };
