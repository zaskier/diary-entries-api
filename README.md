# diary-entries-api
DESCRIPTION
The main component of the application backend. It will enable the mobile app to actually view and manage the diary entries.

ASSUMPTIONS OF THE INITIAL STATE OF WORKING APPLICATION
Used weather API is http://api.openweathermap.org/data/2.5/weather 
User unique author identifier is "email adress".
User would be authenticaded though Identity Aware poroxy or Identitdy Awatre access.(i did not provide Authentication because it was not in the requirments)
CRUD opetration can be performend on every entry
weather API is on free version it can be replaced in config json file "\controllers\weather-api-config.json" for every instance it is hosted.

body assumptions
Weather data is simple(it could be expanded if required)
"location" parameter is not required for diary entry.
If weather API would not workproperly diary entry stil can be created.
"location" parameter needs to be the format as in the API(http://api.openweathermap.org/data/2.5/weather). It could be improved by NLP transaltion if it would be required from other backend team.

TO TEST API
{http://localhost:8080}/api/diary 
GET - get's all elements but it can be also filtered by URL parameter "userID"

POST - Add new entry
   /*request body
   {
        "userID": "wojciech.iskierka@protonmail.com",    //required
        "title": "4th entry",     //required
        "content": "test 4 contetnt",      //required
        "location": "Palo Alto",  
   }
   Example response//
    {
        "weather": {
            "shortDescription": "scattered clouds",
            "temperature": "280.06",
            "humidity": "81",
            "pressure": "1025",
            "visibility": "10000",
            "windDeg": "2.06",
            "windSpeed": "0",
            "clouds": "40",
            "matchedLocatioName": "Palo Alto"
        },
        "_id": "5ffb249a05153e51f4c8260d",
        "userID": "name.surname@protonmail.com",
        "title": "43th entry",
        "content": "test 43",
        "location": "Palo Alto",
        "__v": 0
    }


Operation on specified record
 {http://localhost:8080}/api/diary/{entryID'}
 GET - gets entry
 PUT - modifies entry
 PATCH - modify specified params of body
 DELETE - delete record


// to test example weather API(10jan2021) GET http://api.openweathermap.org/data/2.5/weather?q=Cracow&appid=f77b11b08e40dc9c363bd82623c07c7f


TESTS - tests will be fixed, improved and revised in the future 
Unit tests are made with Mocha
Integration Test's are made with Supertest
"npm test"