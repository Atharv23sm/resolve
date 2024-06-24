// import User from '@/models/userModel';
// import nodemailer from 'nodemailer';
// import bcryptjs from 'bcryptjs'

// export const sendEmail = async({email, emailType, userId}:any)=>{
//     try{

//       const hashedToken = await bcryptjs.hash(userId.toString(), 10)

//       if(emailType === "VERIFY"){
//         await User.findByIdAndUpdate(userId, {verifyToken:hashedToken, verifyTokenExpiry:Date.now() + 3600000})
//       }
//       else if(emailType === "RESET"){
//         await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now() + 3600000})
//       }

//       var transporter = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "49360cb4d09426",
//           pass: "62140732d61d06"
//         }
//       });

//           const mailoptions = {
//             from: 'atharvsm23@gmail.com',
//             to: email,
//             subject: emailType === 'VERIFY' ? "Verify your email" : "Reset email",
//             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
//           }

//           const mailRes = await transporter.sendMail(mailoptions)

//           return mailRes

//     }
//     catch(err:any){
//         throw new Error(err.message)
//     }
// } 