const express = require('express')
const proxy = require('http-proxy-middleware')

const router = require('./app/index') 

const app = new express();

router(app)

// app.use(
//     proxy('/stream', {target: 'http://localhost:1996'})
//   );


app.listen(1996);

