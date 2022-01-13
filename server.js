const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');

const movieRoutes = require('./routes/api/movieAPI');

//port config
const port = process.env.PORT || 8000 ;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({ origin: true, credentials: true }))

//DB config
mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true
}).then(()=>console.log("database connected successfully"))
.catch(()=>console.log("database not connected"))

//api routes
app.use('/api/movies',movieRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

app.listen(port,(req,res)=>console.log(`app running on ${port}`));