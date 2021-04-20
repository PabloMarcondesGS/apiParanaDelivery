"use strict";

const User = use("App/Models/User");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
class RecoverController {
  async store({ request }) {
    try {
      const data = request.only(["email"]);
      const user = await User.query().where("email", data.email).firstOrFail();

      const pwdChars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const pwdLen = 6;
      const randPassword = Array(pwdLen)
        .fill(pwdChars)
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join("");

      user.merge({ password: randPassword });
      await user.save();
      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          auth: {
            user: "rodrigoaraujo990@gmail.com",
            pass: "108094ro#",
          },
        })
      );
      const mailOptions = {
        from: "rodrigoaraujo990@gmail.com",
        to: data.email,
        subject: "Sua nova senha",
        text: `
        Recuperando senha
        Como solicitado, pelo aplicativo aqui está a sua nova senha.
        Por favor, ao realizar um novo login por questões de segurança altere a sua senha em seu perfil.
        Sua nova senha: ${randPassword}

        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = RecoverController;
