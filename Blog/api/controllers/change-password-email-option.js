module.exports = (transporter, user, otp, res) => {
    let mailOptions = {
        from: ` "Change password" <${process.env.EMAIL_USERNAME}>`,
        to: user.email,
        subject: "roxyzc -Change your password",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #F7F9FA; padding: 50px 20px; font-size: 110%;">
            <h3><span style="font-weight:bold; color: red; font-size:1.4rem"> ${user.nama}</span> ${otp} </h3>`
      };
    
      transporter
      .sendMail(mailOptions)
      .then((result) => {
        res.cookie("access-nama", user.nama);
        res.status(200).json({
          message: "Silahkan cek email untuk merubah password",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: err.message || "pengiriman email gagal silahkan coba kembali",
        });
      });
}
