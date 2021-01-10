const fetch = require('node-fetch');
const config = require('./weather-api-config.json');
function diaryController(Diary){
function post(req, res) {
 const diary = new Diary(req.body);
 async function postEntry(){
    let status;
    const weatherApiResponse =  await fetch(`${config.weatherURL}?q=${diary.location}&appid=${config.appID}`)
    .then((res) => { 
        status = res.status; 
        return res.json() 
      })
    console.log('record was added');
    console.log(status);
      if (status == 404) { 
        console.log("Error : there was an isssue with weather API, validate 'location' parameter value or APIU is not working");
        diary.weather.shortDescription="";
        diary.weather.temperature = "";
        diary.weather.humidity = "";
        diary.weather.pressure = "";
        diary.weather.visibility = "";
        diary.weather.windDeg = "";
        diary.weather.windSpeed ="";
        diary.weather.clouds ="";
        diary.weather.matchedLocatioName="";
        }
     else{
        diary.weather.shortDescription=weatherApiResponse.weather[0].description;
        diary.weather.temperature = weatherApiResponse.main.temp;
        diary.weather.humidity = weatherApiResponse.main.humidity
        diary.weather.pressure = weatherApiResponse.main.pressure;
        diary.weather.visibility = weatherApiResponse.visibility;
        diary.weather.windDeg = weatherApiResponse.wind.speed;
        diary.weather.windSpeed =weatherApiResponse.wind.deg;
        diary.weather.clouds =weatherApiResponse.clouds.all;
        diary.weather.matchedLocatioName =weatherApiResponse.name;     
       }
       console.log(diary);
       diary.save();
       if (!req.body.title || !req.body.content || !req.body.userID) {
           res.status(400);
           return res.send('Title, content and UserID are required');
         }
       res.status(201);
       return res.json(diary);

}
postEntry();
     
    }

    function get(req, res) {
        const query = {};
        if (req.query.userID) {
            query.userID = req.query.userID;
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


