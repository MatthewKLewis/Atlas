//Imports
const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const dotenv = require('dotenv')

//Models
const User = require("./models/user.model")

//Routes
const userRoutes = require('./routes/users')
const mapRoutes = require('./routes/maps')


//Configuring...
const port = process.env.PORT || 4000
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
require('./passport')(passport)

//Route Registration
app.use('/users', userRoutes)
app.use('/maps', mapRoutes)

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
  res.send('Invalid Endpoint')
})

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});