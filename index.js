import express from "express";
import jwt from 'jsonwebtoken';

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("HI MAN"+req)
})

app.post("/auth/login", (req,res)=>{
    // req.body={email:"sda", tel:"323123"}
    console.log(req.body)

    const token=jwt.sign({
        email: req.body.email,
        fullName: "Tony",
    },
    "checkkodkodkod")

    res.json({
        success:true,
        token
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("server OK");
})