var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id : 1,
        title : "film 1",
        duration : 100,
        budget : 10000000,
        link : 'https://www.imdb.com/title/tt15398776/'
    },
    {
        id : 1,
        title : "film 2",
        duration : 100,
        budget : 1000000000,
        link : 'https://www.imdb.com/title/tt6966692/'
    },
    {
        id : 1,
        title : "film 3",
        duration : 100,
        budget : 123456789,
        link : 'https://www.imdb.com/title/tt6266538/'
    },
    {
        id : 1,
        title : "film 4",
        duration : 100,
        budget : 123456789,
        link : 'https://www.imdb.com/title/tt0099810/'
    },
    
]

router.get('/', (req, res, next) => {
    console.log('GET /films');
    res.json(FILMS);
  });
  
  module.exports = router;
  