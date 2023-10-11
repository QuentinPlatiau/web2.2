var express = require('express');
const  {
    readAllFilms,
    filterByType,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
} = require('../models/films');

const router = express.Router();

router.get('/', (req, res, next) => {
  let allFilmsPotentiallyOrdered = undefined;
  let allFilmsPotentiallyFiltered = undefined;
  if(req?.query?.order){
    allFilmsPotentiallyOrdered = readAllFilms(req?.query?.order);
  }
   else if(req?.query?.filterTitle){
    allFilmsPotentiallyFiltered = filterByType(req?.query?.filterTitle);
  }
  else {
    allFilmsPotentiallyFiltered = filterByType(req?.query?.filterTitle);
  }

  //renvoie de la liste des films en fonction de ce qui est demandé
  res.json(allFilmsPotentiallyOrdered || allFilmsPotentiallyFiltered);
  });
  
  // Read the film identified by an id in the FILMS
router.get('/:id', (req,res) => {
    const foundFilm = readOneFilm(req.params.id);

    if(!foundFilm) return res.sendStatus(404);
  
     return res.json(foundFilm);
  });

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  
    if (!title || !duration) return res.sendStatus(400);

    const createdFilm = createOneFilm(title, duration);

    return res.json(newFilm);
  });

/*router.get('/filter/:character', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const deletedFilm = deleteOneFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;

  if ((!title && !link) || title?.length === 0 || link?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedFilm = updateOneFilm(req.params.id, { title, link });

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;
  