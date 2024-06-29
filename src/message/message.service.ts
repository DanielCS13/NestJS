import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MessageService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', // Configura tu servidor SMTP
      port: 587, // Configura el puerto
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: '4a5ebcd05f88a4', // Tu correo
        pass: '68ded719f368a2', // Tu contraseña
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: '"NestJS Contact" <t022700620@unitru.edu.pe>', // Remitente
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Mensaje enviado: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error de correo enviado:', error);
      throw error;
    }
  }
}
