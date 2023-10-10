const nodemailer = require("nodemailer");

async function sendMessage(req, res, pdfBuffer) {
  const { message, to, subject, name } = req.body;

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "icexpressdeliveryservice@gmail.com", // generated ethereal user
        pass: "icexpress2023", // generated ethereal password
      },
    });

    const sitename = "IceXpress Delivery";
    const imagelogo =
      "https://firebasestorage.googleapis.com/v0/b/icexpress-21465.appspot.com/o/icelogo.png?alt=media&token=3cd66abf-2236-4ba8-8883-b4dc03e3e932"; // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "icexpressdeliveryservice@gmail.com", // sender address
      bcc: to, // list of receivers
      subject: `${subject} / IceXpress Delivery ✅`,
      text: "",
      attachments: {
        filename: "invoice.pdf",
        content: new Buffer.from(pdfBuffer),
      },
    });

    return info;
  }

  main()
    .then((info) => {
      res.send("working");
      console.log("Message sent: %s", info.messageId);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
}

module.exports = { sendMessage };
