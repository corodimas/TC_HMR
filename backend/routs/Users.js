const express = require("express")
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require("bcryptjs");
const {validataeToken} =require('../middlewares/AuthMiddlewares')
const {sign} = require('jsonwebtoken')

router.post("/login", async (req,res)=>
{
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}})

    if(!user) res.json({error:"User Doesn't Exist"});

    bcrypt.compare(password, user.password).then((match =>{
        if (!match) res.json({error:"Wrong Username or Password"});

        const accessToken = sign({username: user.username, id: user.id},"2spKlbzOG1");
        res.json({token:accessToken, username: user.username, id: user.id});
    }))
});

router.post("/", async (req,res)=>
{
    const {username, password} = req.body
    bcrypt.hash(password,10).then((hash) =>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json("SUCCES");
    })
});

router.get('/validate', validataeToken, (req, res) => {
    // Now you can access the username from req.user.username
    const username = req.user.username;
    res.json({ username: username });
  });

module.exports = router