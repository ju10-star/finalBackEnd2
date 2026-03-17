import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.mail.user,
        clientId: config.mail.clientId,
        clientSecret: config.mail.clientSecret,
        refreshToken: config.mail.refreshToken
      }
    });
  }

  async sendPurchaseEmail(userEmail, ticket) {
    await this.transporter.sendMail({
      from: config.mail.user,
      to: userEmail,
      subject: "Confirmación de compra",
      html: `
        <h2>Compra confirmada</h2>
        <p>Tu compra fue procesada correctamente.</p>
        <p><strong>Ticket:</strong> ${ticket.code}</p>
        <p><strong>Total:</strong> $${ticket.amount}</p>
        <p>Gracias por tu compra.</p>
      `
    });
  }
}

export const mailService = new MailService();