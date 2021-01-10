const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express( );
if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/diary_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/diary-Prod');
}
//const db = mongoose.connect('mongodb://localhost/diary');
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const Diary = require('./models/diaryModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const diaryRouter =require('./routes/diaryRouter')(Diary);

app.use('/api',diaryRouter);

app.get('/', (req, res)=>{
    res.send('Diary API');
});

app.listen(port, ()=>{
    console.log(`Running on Port : ${port}` );
    });

    module.exports = app;