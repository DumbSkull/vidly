require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
process.env["NODE_CONFIG_DIR"] = __dirname + "./config/"

let routerGenre = require('./genres');
routerGenre = routerGenre.router;
let routerCustomer = require('./customers');
routerCustomer = routerCustomer.router;
let routerMovies = require('./movies');
routerMovies = routerMovies.router;
let routerRentals = require('./rentals');
routerRentals = routerRentals.router;
let routerAuth = require('./auth');
routerAuth = routerAuth.router;
let routerUsers = require('./users');
routerUsers = routerUsers.router;
let server;

const error = require('./middlewears/error');
require('./prod')(app);

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey not defined! Exiting');
    process.exit(1);
}

mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// const MongoClient = require('mongodb').MongoClient;
// const uri = //config.get('db');
// "mongodb+srv://dumbSkull:prototype@vidly-iodxc.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
  
//   client.close();
// });

app.use(express.json());
try{
    app.use('/api/genres', routerGenre);
}
catch(err){
    console.log(err.message);
}
app.use('/api/customers', routerCustomer);
app.use('/api/movies', routerMovies);
app.use('/api/rentals', routerRentals);
app.use('/api/users', routerUsers);
app.use('/api/auth', routerAuth);

app.use(error);

app.get('/', (req, res)=>{
    res.send('WELCOME TO VIDLY! ');
})

console.log('lololol');
const port = process.env.PORT;
server = app.listen(port, ()=>console.log('Listening at port '+port));

module.exports = server;