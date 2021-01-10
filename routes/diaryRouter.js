const express = require('express');
const diaryController = require('../controllers/diaryController');

function routes(Diary){
    const diaryRouter= express.Router();
    const controller = diaryController(Diary);
    diaryRouter.route('/diary')
    .get(controller.get)
    .post(controller.post)

   diaryRouter.use('/diary/:entryID', (req, res, next) =>{
    Diary.findById(req.params.entryID, (err, diary) => {
        if (err) {
          return res.send(err);
        }
        if(diary){
            req.diary = diary;
            return next();
        }
        return res.sendStatus(404);
      });
   })
   diaryRouter.route('/diary/:entryID')
    .get((req, res) => res.json(req.diary))
    .put((req, res) => {
            const {diary} = req;
            diary.userID = req.body.userID;
            diary.title = req.body.title;
            diary.content = req.body.content; 
            diary.weather = req.body.weather;
            req.diary.save((err) => {
                if (err) {
                    return res.json(diary);
                }
                return res.json(diary);
                });
     })
    .patch((req, res) =>{
         const {diary} = req;
        if (req.body._id){
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) =>{
            const key = item[0];
            const value = item[1];            
            diary [key] = value;
    })
    req.diary.save((err) => {
        if (err) {
            return res.json(diary);
        }
        return res.json(diary);
        });
    })
    .delete((req, res) =>{
        req.diary.remove((err)=> {
            if (err) {
                return res.send(err);
            }
            console.log(`Entry ' ${req.params.entryID} ' was deleted`);
            return res.sendStatus(204);
        });  

    });
    return diaryRouter
}

module.exports = routes;