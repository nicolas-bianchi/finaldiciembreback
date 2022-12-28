const express = require ("express");
const router = express.Router();
const {pokemonList, newPokemon, img} = require ("../controllers/pokemones")

router.get("/pokemones", pokemonList);
router.get("/pokemones/:id", img);
router.post("/pokemones/pokemonAdd",newPokemon);

module.exports = router;