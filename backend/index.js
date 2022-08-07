const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
//const port = 3000    ... only react app will run on port 3000.
const port = 5000    
app.use(cors());


//middle ware used for req.body that in auth.js which will help avoid sending undefined in console.
app.use(express.json());    


//Available Routes
app.use('/api/auth', require('./routes/auth'));     //creating api's
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})