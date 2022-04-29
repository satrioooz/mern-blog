module.exports = (transporter, user, req, res) => {
    let mailOptions = {
        from: ` "Verify your email" <${process.env.EMAIL_USERNAME}>`,
        to: user.email,
        subject: 'roxyzc -Verify your email',
        html: `<h3> ${user.nama}! thanks for registering in our site </h3>
                <h4> Please verify your email to continue... </h4>
                <a href="http://${req.headers.host}/api/verify-email?token=${user.tokenEmail}">Verify your email</a>`
    };

    transporter.sendMail(mailOptions)
    .then((result) => {
        res.status(200).json({
            message: "Berhasil buat akun silahkan verifikasi email anda"
        });
    }).catch((err) => {
        res.status(409).json({
            message: err.message || "Gagal membuat akun"
        });
    });
};