const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

const FBAuth = require('./util/FBAuth');

const {getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream} = require('./handlers/screams');

const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users');


//Scream Routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.post('/scream/:screamId/comment', FBAuth,commentOnScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);

//User Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);