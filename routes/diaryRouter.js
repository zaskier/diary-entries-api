const express = require('express');

function routes(Diary){
    const diaryRouter= express.Router();
    diaryRouter.route('/diary')
    .get((req, res)=>{

    const query = {};
    if (req.query._id) {
        query._id = req.query._id;
      }
    Diary.find(query, (err, diary) =>{
    if(err){
      return res.send(err);  
    } else {
       return res.json(diary) 
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

   diaryRouter.route('/diary/:entryID')
   .get((req, res) => {
     Diary.findById(req.params.entryID, (err, diary) => {
       if (err) {
         return res.send(err);
       }
       return res.json(diary);
     });
   })
   .put((req, res) => {
     Diary.findById(req.params.entryID, (err, diary) => {
        if (err) {
          return res.send(err);
        }
        diary.userID = req.body.userID;
        diary.title = req.body.title;
        diary.Content = req.body.Content; //TODO replace with small letter 
        diary.weather = req.body.weather;
        diary.save();
        return res.json(diary);
      });
    });


      return diaryRouter
}

module.exports = routes;