const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express( );
const db = mongoose.connect('mongodb://localhost/diary');
const port = process.env.PORT || 8080;
const Diary = require('./models/diaryModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const diaryRouter = express.Router();

diaryRouter.route('/diary')
.get((req, res)=>{
//const response = {hello: 'Diary example'};
//const {query} = req;
//?_id=5ff21dc34cdff75fc448f0d5 replace with userID
const query = {};
if (req.query._id) {
    query._id = req.query._id;
  }
Diary.find(query, (err, diary) =>{
if(err){
  return res.send(err);  
} else {
   return res.json(diary)  //small vs big mon vs 
}
});
})
.post((req, res) => {
    const diary = new Diary(req.body);
    console.log('record was added');
    console.log(diary);
/*request body
 {
    "userID": "wojciech.iskierka@protonmail.com",
    "title": "second entry",
    "Content": "test 02",
    "weather": "rainy"
 }*/
    diary.save();
    return res.status(201).json(diary);
  });
app.use('/api',diaryRouter);


app.get('/', (req, res)=>{
    res.send('Diary API');
});

app.listen(port, ()=>{
    console.log(`Running on Port : ${port}` );
    });