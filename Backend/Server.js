const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router/Router.js');
const PORT = 5001;
const cookieParser = require('cookie-parser');
const {connectDB} = require('../Backend/db/connector.js');
const authrouter = require('./Router/authrouter.js');
const authenticateToken = require('../Backend/middleware/auth.js');

connectDB();
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({ 
    origin: '*',
    methods: ['POST','GET'], // allow only POST requests
    optionsSuccessStatus: 200 // some legacy browsers choke on 204
  })); 



app.listen(PORT,()=>{
    console.log(`server is listening to the port ${PORT}`);
})

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route'});
}); 


app.use('/auth',authrouter);
app.use('/request',router);
