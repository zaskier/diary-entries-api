const express = require('express');

function routes(Diary){
    const diaryRouter= express.Router();
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
    
        diary.save();
        return res.status(201).json(diary);
      });    
      return diaryRouter
}

module.exports = routes;