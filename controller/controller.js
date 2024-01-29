const adminModel = require ("../models/adminModel.js");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
// const storeModel = require ("../models/storeModel.js");
// const productModel = require("../models/productsModel");

const registration = async (req, res) => {
    try {
        const { firstName, email, password } = req.body
        const isEmail = await adminModel.findOne({email});
        if (isEmail) 
            return res.status(400).json({
                message: "user already exists"
            })
            const Admin = process.env.adminEmail;
            if (!Admin.includes(email.toLowerCase())) {
                return res.status(400).json({
                    message: "email not registered"
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                
                const data = {
                    firstName,
                    email: email.toLowerCase(),
                    password: hash
                }

                const newAdmin = await adminModel.create(data);
                // const saveAdmin = newAdmin.save();

                if (!newAdmin) {
                    res.status(400).json({
                        message: "failed to create"
                    })
                } else {
                    res.status(201).json({
                        message: "created successfully",
                        data: newAdmin
                    });
                }

            };
        

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await adminModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        var admin = process.env.adminEmail
        if (!admin.includes(email.toLowerCase())){
            return res.status(400).json({
                message: "user not found"
            })
        } else {
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                res.status(400).json({
                    message: "incorrect password"
                })
            } else {
                const loginToken = await genToken(user, {expiresIn: '1d'});
                user.token = loginToken
                const userLogin = await adminModel.findByIdAndUpdate(user._id, {isLogin: true}, {new: true});
                await user.save();
                res.status(200).json({
                    message: "login successful",
                    data: userLogin,
                    // token: loginToken
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const signOut = async (req, res) => {
    try {
        const { id } = req.params;
        const token = " ";
        const userLogOut = await adminModel.findByIdAndUpdate(id, {isLogin: false}, {new: true});
        const logOut = await adminModel.findByIdAndUpdate(id,  {token: token},  {new: true});
        if (!userLogOut) {
            res.status(400).json({
                message: "User not loggedout"
            })
        } else {
            res.status(200).json({
                message: "user logged out successfully",
                data: logOut
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const genToken = async(user,time)=>{
    const token = await jwt.sign({
        userId: user._id,
        firstName: user.firstName,
        email: user.email
    }, process.env.JWT_TOKEN, time)
    return token
};
module.exports = { registration, adminLogin, signOut }



