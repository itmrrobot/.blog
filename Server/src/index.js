const express = require('express');
require('./db/mongoose');
const blogRouter = require('./router/blogs');
const userRouter = require('./router/user');
const app = express();

app.use('/images',express.static('images'));
app.use(express.json());
app.use(blogRouter);
app.use(userRouter);


app.listen(4000,() => {
    console.log('Server started on port 4000');
})