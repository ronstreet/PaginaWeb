const express = require('express');

const morgan = require('morgan');

const {engine} = require('express-handlebars')

const path=require('path')


const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers:{
        igual:(arg1, arg2, options) =>{
            if(arg1==arg2){
                    return options.fn(this); 
            }    
            return options.inverse(this);
        }}
    
}));

app.set('view engine','.hbs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended:false
}));


//routes
app.use(require('./routes/index'));


//static files
app.use(express.static(path.join(__dirname,'/public')));


module.exports= app;