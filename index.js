import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose.connect("mongodb+srv://admin:root@cluster0.oemjr1o.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB OK"))
    .catch((err) => console.error(err))
const app = express()

app.use(express.json())

app.post("/auth/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ tel: req.body.tel })
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль"
            })
        }
        const token = jwt.sign({
            _id: user._id,
        }, "mySecret",
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc

        res.json(...userData, token)

    }
    catch (error) {
        console.error(error, code);
        res.status(500).json({ message: `Не удалось зайти - ${error}` })
    }
})

app.get("/auth/me", (req, res) => {
    try {
        res.json({
            success: true
        })
    } catch (err) {
        console.error(err);

    }
})

app.post("/auth/register", registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new UserModel({
            passwordHash: req.body.password,
            nickName: req.body.nickName,
            fullName: req.body.fullName,
            tel: req.body.tel,
            avatarUrl: req.body.avatarUrl
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, "mySec ret",
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc

        res.json(...userData, token)
    } catch (error) {
        res.status(500).json({ message: `Не удалось зарегаться - ${error}` })
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("server OK");
})