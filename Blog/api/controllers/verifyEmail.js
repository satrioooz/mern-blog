
module.exports = (transporter, user, req, res) => {
  let mailOptions = {
    from: ` "Verify your email" <${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: "roxyzc -Verify your email",
    html: `
            <div style="max-width: 700px; display:flex; justify-content:center; align-items:center; background-color:#F7F9FA;
                <img src='../../images/email.png/>
            <div>
        <h3> ${user.nama}! Thanks for registering in our site </h3>
                <h4> Just click the button below to validate your email address. </h4>
                <a target="_blank" href="http://${req.headers.host}/api/verify-email?token=${user.tokenEmail}">Verif email</a>
                </div>

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
