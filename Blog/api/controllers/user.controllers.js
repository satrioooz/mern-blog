const { User, nodemailer, crypto, jwt, ev, bcrypt } = require("../models/");
const { validationResult } = ev;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthhorized: false,
  },
});

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(409).json({
      errors: errors.array(),
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      nama: req.body.nama,
      password: hashPassword,
      email: req.body.email,
      tokenEmail: crypto.randomBytes(64).toString("hex"),
    });
    user
      .save()
      .then((result) => {
        require("./verifyEmail")(transporter, user, req, res);
      })
      .catch((err) => {
        res.status(409).json({
          message: err.message || "Akun tidak berhasil dibuat",
        });
      });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  // if(!findUser){
  //     res.status(409).json({
  //         message: "User tidak ditemukan"
  //     });
  // }else{
  const match = await bcrypt.compare(password, findUser.password);
  if (!match) {
    res.status(409).json({
      message: "Password user salah",
    });
  } else {
    const token = require("./createToken")(jwt, findUser.id);
    res.cookie("access-token", token);
    res.status(200).json({
      message: "Berhasil login",
    });
    // }
  }
};

exports.verifyEmailUser = async (req, res) => {
  const token = req.query.token;
  const user = await User.findOne({ tokenEmail: token });
  if (!user) {
    res.status(409).json({
      message: "Email tidak ditemukan",
    });
  } else {
    user.tokenEmail = null;
    user.isVerified = true;
    await user
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Email Berhasil di verifikasi",
        });
      })
      .catch((err) => {
        res.status(409).json({
          message: err.message || "Email Gagal diverifikasi",
        });
      });
  }
};

exports.getData = (req, res) => {
  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message || "Error mendapatkan data",
      });
    });
};

exports.logout = (req, res) => {
  res.cookie("access-token", "", { maxAge: 1 });
  res.status(200).json({
    message: "Akun berhasil logout",
  });
};
