const express = require('express');
const router = express.Router();
const Blogs = require('../models/blogs');
const {auth} = require('../midleware/auth');
const multer = require('multer');
const ROLE = require('../role');
const fs = require('fs');
const path = require('path');
const imagesPath = path.join(__dirname,'../../images/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  })

const upload = multer({
    storage: storage,
    limits: 1000000,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            cb(new Error('Please upload image'));
        }
        cb(null,true);
    }
});

router.get('/blogs',async(req,res) => {
    try {
        const blogs = await Blogs.find({});
        res.send(blogs);
    } catch(e) {
        res.status(500).send();
    }
})

router.get('/blogs/me',auth,async(req,res) => {
    let blogs;
    try {
        if(req.user.role===ROLE.ADMIN) {
            blogs = await Blogs.find({});
        } else {
            blogs = await Blogs.find({authorId:req.user._id});
        }
        res.send(blogs);
    } catch(e) {
        res.status(500).send();
    }
})

router.get('/blogs/:id',async(req,res) => {
    const _id = req.params.id;
    try{
        const blog = await Blogs.findById(_id);
        if(!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch(e) {
        res.status(500).send();
    }
})

router.get('/blogs/:id',auth,async(req,res) => {
    const _id = req.params.id;
    try {
        const blog = await Blogs.findOne({_id,$or:[{author:req.user._id},{role:ROLE.ADMIN}]});
        if(!blog) return res.status(404).send();
        res.send(blog);
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/blogs',auth,upload.single('image'),async(req,res) => {
    let image; 
    if(req.file) {
        image = '/'+req.file.filename;
    }
    console.log(req.file);
    const blogs = new Blogs({
        image: image,
        ...req.body,
        authorId: req.user._id,
        authorName: req.user.name
    });
    try {
        await blogs.save();
        res.status(201).send(blogs);
    } catch(e) {
        res.status(400).send();
    }
})

router.patch('/blogs/:id',auth,async(req,res) => {
    const update = Object.keys(req.body);
    const updatedAllowed = ["title","info"];
    const isValidOperation = update.every(update => updatedAllowed.includes(update));
    if(!isValidOperation) return res.status(400).send({error:'Invalid update!'})
    try {
        const blog = await Blogs.findOne({_id:req.params.id,$or:[{author:req.user._id},{role:ROLE.ADMIN}]});
        
        if(!blog) return res.status(404).send();
        update.forEach(update => blog[update]=req.body[update]);
        await blog.save();
        res.send(blog);
    } catch(e) {
        res.status(400).send();
    }
})

router.delete('/blogs/:id',auth,async(req,res) => {
    try {
        const blog = await Blogs.findOneAndDelete({_id:req.params.id,$or:[{author:req.user._id},{role:ROLE.ADMIN}]});
        fs.unlinkSync(imagesPath+blog.image);
        if(!blog) return res.status(404).send();
        res.send(blog);
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/blog/upload',auth,upload.single('blog-image'),async(req,res) => {
    res.send();
},(error,req,res,next) => {
    res.status(400).send({error:error.message});
})

module.exports = router;