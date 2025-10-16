const nodemailer = require('nodemailer');

module.exports = {
    
    sendSalesDataEmail: async (salesData, email) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).replace(/ /g, '-'); 
        };
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: `${process.env.EMAIL_RECEIVER1}, ${process.env.EMAIL_RECEIVER2}, ${process.env.EMAIL_RECEIVER3},${process.env.EMAIL_RECEIVER4}`,
            subject: 'New Collection Booking Request', 
            text: `
            Salesperson Email: ${email}

            Collection Booking Details
            Date of Collection: ${formatDate(salesData.dateOfCollection)}
            Time of Collection: ${salesData.timeOfCollection}
            Client Name: ${salesData.clientName}
            Client Number: ${salesData.clientNumber}
            Location: ${salesData.location}
            Type of Material: ${salesData.typeOfMaterial}
            No. of Pallets: ${salesData.noOfPallets}
            Packaging Type: ${salesData.packagingType}
            Type of Truck: ${salesData.typeOfTruck}
            Man Power Required: ${salesData.manPowerRequired ? 'Yes' : 'No'}
            TOO or Gate Pass: ${salesData.tooOrGatePass}
            Remarks: ${salesData.googleMapLocation}
      
            Booking Date: ${formatDate(salesData.createdAt)}
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};
