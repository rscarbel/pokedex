const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const port = process.env.PORT || 3000;
const pokemon = require('./models/pokemon')
const caught = require('./models/caught')

const app = express();
const methodOverride = require("method-override")

app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));


app.get('/pokedex/entry/:pokemonId', (req,res) => {
  res.render('entry.ejs', {
    pokemonData: pokemon[caught[req.params.pokemonID]]
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

app.listen(port, () => {
  console.log(`Express is listening on port: ${port}`)
})
