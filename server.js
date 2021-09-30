const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req,res) => {
  res.render('show.ejs')});

app.listen(port, () => {
  console.log(`Express is listening on port: ${port}`)
})
