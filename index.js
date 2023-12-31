//access package
const express = require('express');
const morgan = require('morgan');
const people = require('./routes/people');
const information = require('./routes/information')
//create app instance 
const app = express();


//use json
app.use(express.json());

app.use(morgan('tiny'));
//use routes
app.use('/api/people', people)
app.use('/api/information', information)
//create a port
const port = process.env.PORT || 3002;

//listen to port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

