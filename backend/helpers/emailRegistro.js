import nodemailer from 'nodemailer';
import { Resend } from 'resend'

const emailRegistro = async (datos) => {
    try {
        // CODIO PARA NODEMAILER - No funciono
        // const transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });
    
        // CODIO PARA RESEND - Si funciono
        const resend = new Resend('re_5LpGQhxo_NEPQzdJJqG7bGeT8Jmp8eQb6');
    
        const { email, nombre, token } = datos;
        // Enviar el Email
        // le pasmaos el objeto de configuracion del email, destinatario, enviado, asunto, etc
        // CODIO PARA NODEMAILER - No funciono
        // const info = await transporter.sendMail({
        //     from: 'onboarding@resend.dev',
        //     to: email,
        //     subject: 'Comprueba tu cuenta en APV', // El asunto
        //     text: 'Comprueba tu cuenta', // La version sin html
        //     html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        //     <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:</p>
        //     <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
        //     <p>Si tu no creates esta cuenta, elimina el mensaje</p>
        //     `,
        // });
    
        // CODIO PARA RESEND - Si funciono
        const { data, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Comprueba tu cuenta en APV',
            text: 'Comprueba tu cuenta',
            html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
            <p>Si tu no creates esta cuenta, puedes ignorar el mensaje</p>
            `,
        });
    
        // CODIO PARA NODEMAILER - No funciono
        // console.log('Mensaje enviado NODEMAILER: %s', info.messageId);
        
        // CODIO PARA RESEND - Si funciono
        if (error) {
            console.log({error});
            return;
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export default emailRegistro;