const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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

const listClef = Object.keys(FILMS[0]);

function readAllFilms(orderBy) {
  const orderByDuration = orderBy?.includes('duration') ? orderBy : undefined; 
  let orderedFilms;
  const films =  parse(jsonDbPath,FILMS);

  //triage des films en fonction de la durer
  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  if (orderByDuration)
    orderedFilms = [...films].sort((a, b) => b.duration - a.duration);
  if (orderByDuration === 'minimum-duration') orderedFilms = orderedFilms.reverse();


  //renvoie de la liste des films en fonction de ce qui est demandé
  const allFilmsPotentiallyOrdered = orderedFilms ?? films;
  return allFilmsPotentiallyOrdered;
};

function filterByType(filterByType){
    const filterByTitle = filterByType;

    const films =  parse(jsonDbPath,FILMS);

     //filtrage des films en fonction des titres
    let filteredFilms;
    console.log(`filter by ${filterByTitle ?? 'not requested'}`);
    if(filterByTitle){
        filteredFilms = [...films].filter((item) => item.title.startsWith(filterByTitle));
        console.log(filteredFilms);
    }
    return filteredFilms ?? films;
};
  
  // Read the film identified by an id in the FILMS
function readOneFilm(id) {
    const idNumber =  parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const indexOfFilmsFound = films.findIndex((film) => film.id == idNumber);  
    if(indexOfFilmsFound < 0) return res.sendStatus(404);
    return films[indexOfFilmsFound];
};

function createOneFilm(title, duration) {
    const films = parse(jsonDbPath, FILMS);

    const newFilm = {
        id: getNextId(),
        title: title,
        link: link,
    };

    films.push(newFilm);
    serialize(jsonDbPath, films);
    return newFilm;

};
  
function getNextId() {
    const films = parse(jsonDbPath, FILMS);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}
/*
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
  });*/

function deleteOneFilm(id) {
    const idNumber =  parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex((film) => film.id === idNumber);
    if (foundIndex < 0) return undefined;
    const itemsRemovedFromFILMS = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromFILMS[0];
    serialize(jsonDbPath, films);
    return itemRemoved;  
};

// Update a pizza based on its id and new values for its parameters
function updateOneFilm(id, propertiesToUpdate) {  
    const idNumber =  parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex(film => film.id === idNumber);
    if (foundIndex < 0) return undefined;
    const updatedFilm = {...films[foundIndex], ...propertiesToUpdate};
    films[foundIndex] = updatedFilm;
    serialize(jsonDbPath, films);
    return updatedFilm;
};

  module.exports = {
    readAllFilms,
    filterByType,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm
  };
  