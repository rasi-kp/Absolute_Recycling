const nodemailer = require('nodemailer');

module.exports = {
    
    sendSalesDataEmail: async (salesData,email) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: `${process.env.EMAIL_RECEIVER1}, ${process.env.EMAIL_RECEIVER2}`, 
            subject: 'New Sales Data Recorded', // Subject
            text: `
            A new sales record has been added:

            Salesperson Email :${email}
            
            Client Name: ${salesData.clientName}
            Client Number: ${salesData.clientNumber}
            Location: ${salesData.location}
            Google Map Location: ${salesData.googleMapLocation}
            Date of Collection: ${new Date(salesData.dateOfCollection).toLocaleDateString()}
            Time of Collection: ${salesData.timeOfCollection}
            Type of Material: ${salesData.typeOfMaterial}
            No. of Pallets: ${salesData.noOfPallets}
            Type of Truck: ${salesData.typeOfTruck}
            Man Power Required: ${salesData.manPowerRequired ? 'Yes' : 'No'}
            TOO or Gate Pass: ${salesData.tooOrGatePass}
      
            Recorded at: ${new Date(salesData.createdAt).toLocaleDateString()}
          `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
    sendOTPEmail: async (email, otp) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: 'rhmsonline@gmail.com',
            to: email,
            subject: 'OTP for Sign-up RHMS',
            text: `Your OTP for sign-up is: ${otp}`,
        };
        await transporter.sendMail(mailOptions);
    },
    sendForm: async (email, data) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: 'rhmsonline@gmail.com',
            to: email,
            subject: 'Form Submission',
            text: data,
        };
        await transporter.sendMail(mailOptions);
    },
}