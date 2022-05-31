const express=require('express');
var morgan=require('morgan');

const app=express(); //app is instance of express app


//register view engine
app.set('view engine','ejs');//by default,ejs views looked up inside views folder, app.set('views',folder)
//listen on port 3000

app.listen(3000,()=>{
    console.log("listening on port 3000 for requests")
});//localhost is auto inferred


//middleware shipped with express, for allowing serving static files to browser
//(by def, server protects all files on server)
app.use(express.static('public'));//whatever inside public folder could be served to browser


//logger middleware :morgan, with dev formatting /tiny
app.use(morgan('dev'));
//custom logger middleware
app.use((req,res,next)=>{
    console.log("path :", req.path);// like url
    console.log("host :", req.hostname);
    console.log("method :", req.method);
    next()// without next() browser hangs , we need to move on express explicitly to next handler/middleware using next() cuz we are not sending response bk to browser
//npm install --save package : no longer needed post npm 5 versions to add to package.json dep section, and not just locally
});

//handlers for requests
//callbk fn fired when req comes
app.get('/',(req,res)=>{
    const blogs=[
        {"title":"A lazy fox","snippet":"A clever story of legend"},
        {"title":"A clever fox","snippet":"A beautiful story of legend"},
        {"title":"An intelligent fox","snippet":"A nice story of legend"}
    ];
    res.render('index',{title:'Home',blogs});//{key:val,key2:val2} can write just ,blogs cuz blog:blogs same word
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

app.get('/blogs/create',(req,res)=>{
        res.render('create',{title:'Create blog'})
});

// redirect old route to new route
app.get('/about-us',(req,res)=>{
    //express sets redirect status code itself
    //express enforces a new req from browser to /about
    res.redirect('/about');
});

// catch-all for all requests, order is imp cuz once res is send to browser/req handled,
//the code below wont be executed
//use this fn for ALL requests if code execution has reached till here/req unhandled till now
app.use((req,res)=>{
    res.status(404).render('404',{title:404})
    //setStatusCode since express doesnt know if 404.html is err pg response
    //res.status(404) sends a res Object, thus, can chain res.render() with it
});
