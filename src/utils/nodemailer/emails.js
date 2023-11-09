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

const emailSuccessfulUserActualization = async (user) => {
  const subject = "Actualización exitosa!";

  const replacements = {
    username: user.username,
  };

  const html = await readHTMLFile(
    __dirname + "/templates/emailSuccessfulUserActualization.html",
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

const emailSuccessfulPurchase = async (user, cart, total) => {
	const subject = `Gracias por su compra - Black Group Design`;
	
  const replacements = {
		product: JSON.parse(cart.newCart[0]),
		total: total.total,
	};

	const html = await readHTMLFile(
		__dirname + '/templates/emailSuccessfulPurchase.html',
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
  emailSuccessfulUserActualization,
  emailResetPassword,
  emailSuccessfulPurchase
};
