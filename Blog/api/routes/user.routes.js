module.exports = (app) => {
  const { User, ev } = require("../models/");
  const { body, check } = ev;
  const {
    register,
    login,
    verifyEmailUser,
    logout,
    getData,
    changePassword,
    changePasswordOtherOption,
    verifyOtp,
    changePasswordEmailOption
  } = require("../controllers/user.controllers");
  const router = require("express").Router();
  const { loginRequired, verifyEmail} = require("../../config/jwt");

  router.post(
    "/register",
    [
      body("nama").custom(async (nama) => {
        const namaUserDuplikat = await User.findOne({ nama: nama });
        if (namaUserDuplikat) {
          throw new Error("Nama sudah digunakan!");
        }
        return true;
      }),
      body("email").custom(async (email) => {
        const emailUserDuplikat = await User.findOne({ email: email });
        if (emailUserDuplikat) {
          throw new Error("Email sudah digunakan!");
        }
        return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
    ],
    register
  );

  router.post("/login", verifyEmail, login);

  router.get("/active", verifyEmailUser);
  
  router.get("/data", loginRequired, getData);
  
  router.put("/change-password", changePassword);
  
  router.post("/change-password-other-option", changePasswordOtherOption);
  
  router.post("/change-password-other-option/verify-otp", verifyOtp);
  
  router.put("/change-password-other-option/change-password", changePasswordEmailOption);
  
  router.get("/logout", logout);
  
  app.use("/api", router);
};