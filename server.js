const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('CurYear', ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('scale', (text)=>{
    return text.toUpperCase();
})
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs')
// });

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.render('home.hbs', {
        title: 'Home'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title: 'About us'
    });
});

app.get('/Projects',(req,res)=>{
    res.render('Projects.hbs');
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to fulfill'
    });
});

app.listen(port,()=>{
    console.log(`Server is running @ ${port}`);
});