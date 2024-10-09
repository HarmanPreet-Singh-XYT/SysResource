'use server'
import nodemailer from "nodemailer";
const senderEmail = process.env.SMTP_USER;
const supportEmail = process.env.SMTP_SUPPORT;
const senderName = process.env.SMTP_SENDERNAME;
const SMTP_Creds = {user:process.env.SMTP_USER as string,pass:process.env.SMTP_PASS as string,host:process.env.SMTP_HOST as string};
const date = new Date();
const today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

const SMTP = nodemailer.createTransport({
    host: SMTP_Creds.host,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: SMTP_Creds.user,
      pass: SMTP_Creds.pass,
    },
});
export default async function sendMail(name:string,email:string,number:string,message:string){
    try {
        await SMTP.sendMail({
            from: `"${senderName}" <${senderEmail}>`, // sender address
            to: supportEmail, // list of receivers
            subject: "Cloud Request SysResource", // Subject line
            html: `<div style=" max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #ffffff; background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343; " > <header> <table style="width: 100%;"> <tbody> <tr style="height: 0;"> <td> <img alt="" src="https://cdn3d.iconscout.com/3d/premium/thumb/schedule-time-6020499-4995379.png" height="60px" /> </td> <td style="text-align: right;"> <span style="font-size: 16px; line-height: 30px; color: #ffffff;" >${today}</span > </td> </tr> </tbody> </table> </header> <main> <div style="background-color: #fbe3fc; margin: 0; margin-top: 70px; padding: 92px 30px 115px; border-radius: 30px; text-align: center; " > <div style="width: 100%; max-width: 489px; margin: 0 auto;"> <h1 style=" margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f; " > Cloud Notify request from SysResource </h1> <p style=" margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500; " > Hello, </p> <p style=" margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px; " > Name: ${name} <br> Contact Email: ${email} <br> Mobile Number: ${number} <br> Message: ${message}</p> </div> </div> <p style=" max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #8c8c8c; " > Need help? Ask at <a href="mailto:harmanpreetsingh@programmer.net" style="color: #499fb6; text-decoration: none;" >harmanpreetsingh@programmer.net</a > </p> </main> </div>`, // html body
        });
        return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return false;
    }
}