var express = require('express');
var router = express.Router();

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
  //triage des films en fonction de la durer
  const orderByDuration =
    req?.query?.order?.includes('duration')
      ? req.query.order
      : undefined;
  let orderedFilms;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  if (orderByDuration)
    orderedFilms = [...FILMS].sort((a, b) => b.duration - a.duration);
  if (orderByDuration === 'minimum-duration') orderedFilms = orderedFilms.reverse();

  console.log('GET /films');

  //filtrage des films en fonction des titres
  const filterByTitle = req?.query?.filterTitle
    ? req.query.filterTitle
    : undefined;

  let filteredFilms;
  console.log(`filter by ${filterByTitle ?? 'not requested'}`);
  if(filterByTitle){
    filteredFilms = [...FILMS].filter((item) => item.title.startsWith(filterByTitle));
    console.log(filteredFilms);
  }

  //renvoie de la liste des films en fonction de ce qui est demandé
  res.json((orderedFilms || filteredFilms) ?? FILMS);
  });
  
  // Read the film identified by an id in the FILMS
router.get('/:id', (req,res) => {
    console.log(`GET /films/${req.params.id}`);
  
    const indexOfFilmsFound = FILMS.findIndex((film) => film.id == req.params.id);
  
    if(indexOfFilmsFound < 0) return res.sendStatus(404);
  
    res.json(FILMS[indexOfFilmsFound]);
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
  
    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newPizza = {
      id: nextId,
      title: title,
      link: link,
    };
  
    FILMS.push(newPizza);
  
    res.json(newPizza);
  });

router.get('/filter/:character', (req, res) => {
    console.log(`GET /films/filter/${req.params.character}`);
    const character = req.params.character;
    const filteredFilms = [...FILMS].filter((item) =>
      item.title.startsWith(character)
    );
    if (filteredFilms.length === 0) {
      return res.sendStatus(404);
    }
    console.log(filteredFilms);
    return res.json(filteredFilms);
  });

  module.exports = router;
  