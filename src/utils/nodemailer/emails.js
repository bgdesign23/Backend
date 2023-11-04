const { transporter } = require("../../middlewares/nodemailer.js");
const { readHTMLFile } = require("./readHTMLFile.js");

const emailSuccessfulRegistration = async (user) => {
  const subject = "Registro exitoso!";

  const replacements = {
    username: user.username,
  };

  const html = await readHTMLFile(
    __dirname + "/templates/emailSuccessfulRegistration.html",
    replacements
  );

  await transporter.sendMail({
    from: '"Black Group Design" <noreply@blackgroupdesign.com>',
    to: `${user.email}`,
    subject: subject,
    html: html,
  });
};

const emailSuccessfulUserActulization = async (user) => {
  const subject = "Actualización exitosa!";

  const replacements = {
    username: user.username,
  };

  const html = await readHTMLFile(
    __dirname + "/templates/emailSuccessfulUserActulization.html",
    replacements
  );

  await transporter.sendMail({
    from: '"Black Group Design" <noreply@blackgroupdesign.com>',
    to: `${user.email}`,
    subject: subject,
    html: html,
  });
};

const emailResetPassword = async (user, token) => {
	const subject = `Recuperar contraseña - Black Group Design`;

	const replacements = {
		username: user.username,
		token: token,
	};

	const html = await readHTMLFile(
		__dirname + '/templates/emailResetPassword.html',
		replacements,
	);

	await transporter.sendMail({
		from: '"Black Group Design" <noreply@blackgroupdesign.com>',
		to: `${user.email}`,
		subject: subject,
		html: html,
	});
};

module.exports = {
  emailSuccessfulRegistration,
  emailSuccessfulUserActulization,
  emailResetPassword
};
