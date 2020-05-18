const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Database connect
mongoose.connect(
  "mongodb+srv://ravish:2VQ2Tda7UHHZC7m7@businesscustomers-ymsro.mongodb.net/test?retryWrites=true&w=majority",
  {
    useMongoClient:true
  }
);

const app = express();    // Setup App
app.use(morgan('dev'));   // For Logs

app.use(bodyParser.urlencoded({extended:false}));   // Body Parser
app.use(bodyParser.json());

// CORS Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    return res.status(200).json({});
  }
  next();
});

//Initialize routes
app.use('/api', require('./routes/user'));

// Error Handleing
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) =>{
  res.status(error.status||500);
  res.json({
    error:error.message
  });
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
