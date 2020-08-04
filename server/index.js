require('dotenv').config();
const aws = require('aws-sdk')
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const mainCtrl = require('./Controllers/mainCtrl');
const mailCtrl = require('./Controllers/mailCtrl');
const authCtrl = require('./Controllers/authCtrl');

const {SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
} = process.env

const app =express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 21}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db ALL GOOD')
})

app.get('/api/signs3', (req, res) => {
// console.log('hit s3')
aws.config = {
    region: 'us-east-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
}
const s3 = new aws.S3({ signatureVersion: 'v4' });
const fileName = req.query['file-name'];
const fileType = req.query['file-type'];
const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
    };
  
    
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
    console.log('-------',err);
        return res.end();
    }
    console.log('hit s3')
const returnData = {
    signedRequest: data,
    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log(returnData)
    res.status(200).send(returnData)
    });
});

//Authorization 
app.post('/auth/register',  authCtrl.register);
app.post('/auth/Login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/me', authCtrl.logMeIn);

//User endpoints
app.put('/api/profile/:id', mainCtrl.editProfile);
app.put('/api/wallpaper/:id', mainCtrl.updateWallpaper);

//Post endpoints
app.post('/api/post/:author_id', mainCtrl.createPost);
app.get('/api/post/:id', mainCtrl.getUserPosts);
app.get('/api/post', mainCtrl.getPosts)
app.delete('/api/post/:id',mainCtrl.deletePost);

//Nodemailer
app.post('/api/email', mailCtrl.email);

app.listen(SERVER_PORT, () => console.log('Good Vibes on 5050'))