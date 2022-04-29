module.exports = (transporter, user, req, res) => {
  let mailOptions = {
    from: ` "Verify your email" <${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: "roxyzc -Verify your email",
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #F7F9FA; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: #33aff2;">Welcome to the Blog me .</h2>
        <h3><span style="font-weight:bold; color: red; font-size:1.4rem"> ${user.nama}</span> ! Thanks for registering in our site </h3>

                <h4> Just click the button below to validate your email address. </h4>
                <a style="background: #5a8cdb; border-radius:10px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;" target="_blank" href="http://${req.headers.host}/api/verify-email?token=${user.tokenEmail}">Verify your email</a>
                </div>
                `,
  };

  transporter
    .sendMail(mailOptions)
    .then((result) => {
      res.status(200).json({
        message: "Berhasil buat akun silahkan verifikasi email anda",
      });
    })
    .catch((err) => {
      res.status(409).json({
        message: err.message || "Gagal membuat akun",
      });
    });
};
