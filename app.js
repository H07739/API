const express = require('express');
const users=require('./routes/users');
const posts=require('./routes/posts');
const logger=require('./middlewares/logger');
const {er,notfound}=require('./middlewares/errors');
const path =require('path');

const app = express();
app.use(express.static(path.join(__dirname,"images")));
app.use(express.json());
app.use(logger);


app.use('/api/users',users);
app.use('/api/upload',require('./routes/upload'));
app.use('/api/posts',posts);
app.use('/api/comments',require('./routes/comments'));

app.use(notfound);

app.use(er);




const server = app.listen(5000, () => {
    const { address, port } = server.address();
    const hostname = address === '::' ? 'localhost' : address;
    console.log(`Server is running at http://${hostname}:${port}`);
});
