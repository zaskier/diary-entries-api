const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express( );
const db = mongoose.connect('mongodb://localhost/diary');
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const Diary = require('./models/diaryModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const diaryRouter = express.Router(); TOBEREMOVED
const diaryRouter =require('./routes/diaryRouter')(Diary);


app.use('/api',diaryRouter);


app.get('/', (req, res)=>{
    res.send('Diary API');
});

app.listen(port, ()=>{
    console.log(`Running on Port : ${port}` );
    });