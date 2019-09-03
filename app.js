const express = require('express')

const router = require('./app/index') 

const app = new express();

router(app)

app.listen(1996);

