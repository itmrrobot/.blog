const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {auth} = require('../midleware/auth');
const ROLE = require('../role');

router.post('/user',async(req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch(e) {
        res.status(400).send();
    }
})

router.post('/user/login',async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch(e) {
        console.log("Failed");
        res.status(400).send()
    }
})

router.post('/user/password',auth,async(req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send();
        const isCorrectPassword = await user.checkPassword(req.body.password);
        res.status(200).send({isCorrectPassword});
    } catch(e) {
        console.log("Failed");
        res.status(400).send()
    }
})

router.post('/user/logout',auth,async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token!==req.token);
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/user/logoutAll',auth,async(req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(e){
        res.status(500).send();
    }
})

router.get('/user/me',auth,async(req,res) => {
    res.send(req.user);
})

router.get('/user/:id',async(req,res) => {
    const _id=req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user) return res.status(404).send();
        res.send(user);
    } catch(e) {
        res.status(500).send();
    }
})

router.patch('/user/me',auth,async(req,res) => {
    const update = Object.keys(req.body);
    const updatedAllowed = ["name","email","password"];
    const isValidOperation = update.every(update => updatedAllowed.includes(update));
    if(!isValidOperation) return res.status(400).send({error:'Invalid update'});
    try {
        //const user = await User.findById(req.params.id);
        update.forEach(update => req.user[update]=req.body[update]);
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        //if(!user) return res.status(404).send();
        res.send(req.user);
    } catch(e) {
        res.status(400).send();
    }
})

router.delete('/user/me',auth,async(req,res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch(e) {
        res.status(500).send();
    }
})

module.exports = router;