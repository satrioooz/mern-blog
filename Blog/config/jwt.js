const {User, jwt} = require("../api/models");
// const cookieParser = require("cookie-parser");

exports.loginRequired = async (req, res, next) => {
    const token = req.cookies["access-token"];
    if(!token){
        res.status(409).json({
            message: "Belum ada token"
        })
    }else{
        const validToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!validToken){
            res.status(409).json({
                message: "Token invalid"
            });
        }else{
            res.user = validToken.id;
            next();
        };
    };
};

exports.verifyEmail = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(409).json({
            message: "User tidak ditemukan"
        });
    } else{
        if(!user.isVerified){
            res.status(409).json({
                message: "Please check your email to verify your account"
            });
            return false;
        }else{
            next();
        };
    }
};