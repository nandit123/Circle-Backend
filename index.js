const express = require('express');
const bodyParser = require('body-parser');

//Setup express app
const app = express();

app.use(bodyParser.json());

//Initialize routes
app.use('/api/v1',require('./routes/api.js'));

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
