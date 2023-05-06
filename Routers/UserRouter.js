const express = require("express");
const { userModel } = require("../Models/UserModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userRouter = express.Router();

const saltRounds = 5;
// User Register 
userRouter.post("/register", (req, res) => {

    const { name, email, password, isAdmin } = req.body;

    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {

            const newUser = new userModel({
                name,
                email,
                password: hash,
                isAdmin
            });

            await newUser.save();
            res.status(201).send({
                msg: "Register Success",
            });
        });

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({
            msg: "Register Failed",
        });
    }
});


// User Login

userRouter.post("/login", async (req, res) => {


    const { email, password } = req.body;
    try {

        const user = await userModel.findOne({ email });
        // console.log('user:', user)

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(201).send({
                        msg: "Login Success", "token": jwt.sign({ foo: 'bar' }, 'shhhhh')
                    });
                }
                else {
                    res.status(400).send({ msg: "Email or Password incorrect" });
                }
            })
        }
        else {
            res.status(400).send({ msg: "Email or Password incorrect" });
        }

    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ msg: error.message });
    }
})

module.exports = {
    userRouter
}