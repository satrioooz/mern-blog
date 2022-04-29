const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.User = require("./user.model")(mongoose);
db.nodemailer = require("nodemailer");
db.crypto = require("crypto");
db.jwt = require("jsonwebtoken");
db.bcrypt = require("bcrypt");
db.ev = require("express-validator");

module.exports = db;
