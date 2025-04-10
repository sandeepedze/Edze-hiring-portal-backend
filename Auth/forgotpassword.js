const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yourmail@gmail.com',
                pass: 'yourpassword' 
            }
        });

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });

        res.status(200).json({ message: "Reset link sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
