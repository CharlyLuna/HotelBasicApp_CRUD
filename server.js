
const mongoose = require('mongoose');
const express = require('express');
const guestsRoutes=require('./routes/guests');
const employeesRoutes=require('./routes/employees');
const roomsRoutes=require('./routes/rooms');

mongoose.Promise = global.Promise;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended: false} ));
app.use(guestsRoutes);
app.use(employeesRoutes);
app.use(roomsRoutes);
app.use(express.static('public'));
//conexion a nuestra base de datos
mongoose.connect(
  'mongodb+srv://charlyluna:qXsLb1IwIR4qgFuB@cluster0.wmcgopq.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Ahora toca  levantar nuestro server
app.listen(3000);