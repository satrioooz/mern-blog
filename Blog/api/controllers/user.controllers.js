const { User, Otp, otpGenerator, nodemailer, crypto, jwt, ev, bcrypt } = require("../models/");
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
      message: "Email tidak terdaftar",
    });
  } else {
    if(user.expiresAt < Date.now()){
      await User.deleteMany({tokenEmail: token});
      res.status(409).json({
        message: "Akun sudah kadaluarsa silahkan buat kembali"
      })
    }else{
      user.expiresAt = null;
      user.tokenEmail = null;
      user.isVerified = true;
      user
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

exports.changePassword = async (req, res) =>{
  const {email, passwordLama, passwordBaru, confirmPassword} = req.body;
  const findUser = await User.findOne({email: email});
  if(!findUser){
    res.status(409).json({
      message:"Akun tidak ditemukan"
    })
  }else{
    const match = await bcrypt.compare(passwordLama, findUser.password)
    if(!match){
      res.status(409).json({
        message: "Password anda salah"
      });
    }else{
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(passwordBaru, salt);
      const confirm = await bcrypt.compare(confirmPassword, hashPassword);
      if(!confirm){
        res.status(400).json({
          message: "Silahkan masukkan password baru dan confirm password dengan benar"
        })
      }else{
        findUser.password = hashPassword;
        await findUser.save()
        .then((result) => {
          res.status(200).json({
            message: "Berhasil ubah password"
          });
        }).catch((err) => {
          res.status(404).json({
            message: "Gagal merubah password"
          });
        });
      }
    };
  };
};

exports.changePasswordOtherOption = async (req, res) => {
  const {email} = req.body;
  const findUser = await User.findOne({email: email});
  if(findUser){
    const OTP = otpGenerator.generate(6, {
      digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false 
    });

    const otp = new Otp({email: email, otp: OTP});
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(otp.otp, salt);
    otp.otp = hashOtp;
    await otp.save()
    .then((result) => {
      require("./change-password-email-option")(transporter, findUser, OTP, res);
    }).catch((err) => {
      res.status(400).json({
        message: "Otp gagal dikirim"
      });
    });
  }else{
    res.status(400).json({
      message: "Akun tidak ditemukan"
    });
  };
};

exports.verifyOtp = async (req, res) => {
  const {otp} = req.body;
  const nama = req.cookies["access-nama"].toString();
  const otpHolder = await Otp.findOne({
    nama: nama
  });
  if(otpHolder.length === 0) return res.status(400).send("Otp yang kamu gunakan sudah kadaluarsa");
  const validUser = await bcrypt.compare(otp, otpHolder.otp);
  if(validUser){
    return res.status(200).json({
      message: "Otp Valid"
    })
  }else{
    return res.status(400).json({
      message: "Otp invalid"
    });
  };
};

exports.changePasswordEmailOption = async (req, res) => {
  const {passwordBaru, confirmPassword} = req.body;
  const nama = req.cookies["access-nama"].toString();
  const findUser = await User.findOne({nama: nama});

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passwordBaru, salt);
  const confirm = await bcrypt.compare(confirmPassword, hash)
  if(!confirm){
    res.status(400).json({
      message: "Silahkan masukkan password baru dan confirm password dengan benar"
    })
  }else{
    findUser.password = hash;
    findUser.save()
    .then((result) => {
      res.cookie("access-nama", "", {maxAge: 1});
      res.status(200).json({
        message: "Berhasil ubah password"
      });
    }).catch((err) => {
      res.status(404).json({
        message: "Gagal merubah password"
      });
    });
  };
};

exports.logout = (req, res) => {
  res.cookie("access-token", "", { maxAge: 1 });
  res.status(200).json({
    message: "Akun berhasil logout",
  });
};
