const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blogs = require('./blogs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique :true,
        lowercase: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('Password is invalid');
            }
        }
    },
    role: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
})

userSchema.virtual('blogs',{
    ref: 'Blogs',
    localField: '_id',
    foreignField: 'authorId'
})

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.TOKEN_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.checkPassword = async function(password) {
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password);  
    if(!isMatch) {
        return false;
    }
    return true;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Unable to login");
    } 
    const isMatch = await bcrypt.compare(password,user.password);   
    if(!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
}

//Hash the password
userSchema.pre("save",async function(next) {
    const user = this;
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

userSchema.pre("remove",async function(next) {
    const user = this;
    await Blogs.deleteMany({author:user._id});
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;