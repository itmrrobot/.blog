const mongoose = require('mongoose');

const blogsSchema = mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String
    },
    info: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    authorName: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Blogs = mongoose.model('Blogs',blogsSchema);

module.exports = Blogs;