const express=require('express');
const app=express(); //app is instance of express app

//listen on port 3000
app.listen(3000,()=>{
    console.log("listening on port 3000 for requests")
});//localhost is auto inferred

//handlers for requests
//callbk fn fired when req comes
app.get('/',(req,res)=>{
    res.sendFile('./views/index_old.html',{root:__dirname});
});

app.get('/about',(req,res)=>{
    res.sendFile('./views/about_old.html',{root:__dirname});
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
    res.status(404).sendFile('/views/404_old.html',{root:__dirname});
    //setStatusCode since express doesnt know if 404.html is err pg response
    //res.status(404) sends a res Object, thus, can chain res.sendFile() with it
});
