var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const path = require('node:path');


const jsonDbPath = path.join(__dirname, '/../data/films.json');

//const jsonDbPath =  __dirname + '/../data/films.json';


const FILMS = [
    {
        id : 1,
        title : "1film 1",
        duration : "90",
        budget : 10000000,
        link : 'https://www.imdb.com/title/tt15398776/'
    },
    {
        id : 2,
        title : "film 2",
        duration : "110",
        budget : 1000000000,
        link : 'https://www.imdb.com/title/tt6966692/'
    },
    {
        id : 3,
        title : "2film 3",
        duration : "130",
        budget : 123456789,
        link : 'https://www.imdb.com/title/tt6266538/'
    },
    {
        id : 4,
        title : "film 4",
        duration : "100",
        budget : 123456789,
        link : 'https://www.imdb.com/title/tt0099810/'
    },
    
]

router.get('/', (req, res, next) => {
  const orderByDuration =
    req?.query?.order?.includes('duration')
      ? req.query.order
      : undefined;

  const filterByTitle = req?.query?.filterTitle
    ? req.query.filterTitle
    : undefined;

  const films =  parse(jsonDbPath,FILMS);

  //triage des films en fonction de la durer
  let orderedFilms;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  if (orderByDuration)
    orderedFilms = [...films].sort((a, b) => b.duration - a.duration);
  if (orderByDuration === 'minimum-duration') orderedFilms = orderedFilms.reverse();

  console.log('GET /films');

  //filtrage des films en fonction des titres  

  let filteredFilms;
  console.log(`filter by ${filterByTitle ?? 'not requested'}`);
  if(filterByTitle){
    filteredFilms = [...films].filter((item) => item.title.startsWith(filterByTitle));
    console.log(filteredFilms);
  }

  //renvoie de la liste des films en fonction de ce qui est demandé
  res.json((orderedFilms || filteredFilms) ?? films);
  });
  
  // Read the film identified by an id in the FILMS
router.get('/:id', (req,res) => {
    console.log(`GET /films/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);
  
    const indexOfFilmsFound = films.findIndex((film) => film.id == req.params.id);
  
    if(indexOfFilmsFound < 0) return res.sendStatus(404);
  
    res.json(films[indexOfFilmsFound]);
  });

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  
    console.log('POST /films');
  
    if (!title || !link) return res.sendStatus(400); // error code '400 Bad request'

    let matchTitle;

    matchTitle = [...FILMS].find(a => title === a.title);
    
    console.log(`try to match with ${matchTitle ?? 'not requested'}`);

    if(matchTitle != undefined) return res.sendStatus(409);
    
    const films = parse(jsonDbPath, FILMS);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newFilm = {
      id: nextId,
      title: title,
      link: link,
    };
  
    films.push(newFilm);

    serialize(jsonDbPath, films);
  
    res.json(newFilm);
  });

router.get('/filter/:character', (req, res) => {
    console.log(`GET /films/filter/${req.params.character}`);
    const character = req.params.character;
    const films = parse(jsonDbPath, FILMS);
    const filteredFilms = [...films].filter((item) =>
      item.title.startsWith(character)
    );
    if (filteredFilms.length === 0) {
      return res.sendStatus(404);
    }
    console.log(filteredFilms);
    return res.json(filteredFilms);
  });

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const films = parse(jsonDbPath, FILMS);
  
  const foundIndex = films.findIndex(film => film.id == req.params.id);
  
  if (foundIndex < 0) return res.sendStatus(404);
  
  const itemsRemovedFromFILMS = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFILMS[0];

  serialize(jsonDbPath, films);
  
  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;

  console.log('POST /films');

  if ((!title) || title?.length === 0) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  res.json(updatedFilm);
});


  module.exports = router;
  