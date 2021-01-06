function diaryController(Diary){
    function post(req, res) {
        const diary = new Diary(req.body);
        console.log('record was added');
        console.log(diary);
    
        diary.save();
        res.status(201);
        return res.json(diary);
    }
    function get(req, res) {
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
        })
     
    }
    return { post, get }
}

module.exports = diaryController;