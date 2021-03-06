const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const port = process.env.PORT || 3000;
const pokemon = require('./models/pokemon');
const caught = require('./models/caught');
const path = require('path');

const app = express();
const methodOverride = require("method-override")

app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// INDUCES
/*
Index
New
Delete
Update
Create
Edit
Show
*/

app.get('/pokedex/entry/:pokemonId', (req,res) => {
  res.render('entry.ejs', {
    pokemonData: pokemon[req.params.pokemonId],
    pokemonIndex: (req.params.pokemonId - 1)
  })
});

app.get('/pokedex/release', (req,res) => {
  res.render('release.ejs', {
    pokemon : pokemon,
    caught : caught
  })
});

app.get('/pokedex/new', (req,res) => {
  res.render('new.ejs', {
    pokemon : pokemon,
    caught : caught
  })
});

app.get('/pokedex', (req,res) => {
  res.render('pokedex.ejs', {
    pokemon : pokemon,
    caught : caught
  })
});

app.get('*', (req,res) => {
  res.redirect('pokedex')
});

// Delete Route
app.delete('/pokedex/:indexOfPokemon', (req, res) => {
  // This will remove one fruit from the array
  console.log(req.method)
  // remove the object from the array
  console.log(req.params.indexOfPokemon)
  caught.splice(req.params.indexOfPokemon, 1)
  res.redirect('/pokemon')
})

//update route
app.put('/pokedex/:index', (req,res) => {
  pokemon[req.params.index].name = req.body.name;
  res.redirect(`/pokedex/entry/${req.params.index}`)
});

// Create Route
app.post('/pokedex/:indexOfPokemon', (req, res) => {
  let isHighestIndex = true;
  for (let i = 0;i < caught.length; i++) {
    if (caught[i] > req.params.indexOfPokemon) {
      caught.splice(i,0,pokemon[req.params.indexOfPokemon].id);
      isHighestIndex = false
      break;
    }
  }
  if (isHighestIndex) {
    caught.push(pokemon[req.params.indexOfPokemon].id);
  }
  console.log(req.params.indexOfPokemon)
  console.log(caught)
  res.redirect("/pokemon")
})

app.listen(port, () => {
  console.log(`Express is listening on port: ${port}`)
})
