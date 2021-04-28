const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const {mongoose} = require('./database')

//Settings
app.set('port',process.env.PORT || 4000)

//Mdlewearas
app.use(morgan('dev'))
app.use(express.json())
//Routers
app.use('/api/tasks',require('./routes/task.routes.js'));
//Static files
//console.log(path.join(__dirname,'public'))
app.use(express.static(path.join(__dirname,'public')))
//Start server

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})
//*}