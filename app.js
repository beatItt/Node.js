const express=require('express');
var morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog')

const app=express(); //app is instance of express app
//connect to db, then listen for requests from client
const dbURI='mongodb+srv://ruchi:ruchi@practical-node.lol01sm.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result)=>{
    console.log("connected to db");
    app.listen(3000,()=>{
        console.log("listening on port 3000 for requests")
    });//localhost is auto inferred
}).catch((err)=>{console.log(err)});

//register view engine
app.set('view engine','ejs');//by default,ejs views looked up inside views folder, app.set('views',folder)
//listen on port 3000




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

//db collection blogs using model Blog
//save new blog

// let savedId="";
// app.get("/save-blog",(req,res)=>{
//     const blog=new Blog({ //instantiate new Blog obj for save, not needed to instantiate for read methods
//     title:"A chill cat",
//     snippet:"A short tale",
//     body:"once there was a naughty cute cat"
// });
//     blog.save().then((result) => {savedId=result._id;res.send(result)}).catch((err)=> console.log(err));//render view, send response to browser
//     console.log(savedId);
// });

// app.get("/find-last-saved",(req,res)=>{
//     Blog.findById(savedId).then((result)=>{res.send(result)}).catch((err)=>{console.log(err)});
// })




//handlers for requests
//callbk fn fired when req comes
app.get('/',(req,res)=>{
    res.redirect("/blogs");
  //{key:val,key2:val2} can write just ,blogs cuz blog:blogs same word
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

//blogs route
app.get("/blogs",(req,res)=>{//result is array of blogs
    Blog.find().sort({createdAt:-1}).then((result)=>{res.render("index",{title:"All Blogs",blogs:result})}).catch((err)=>{console.log(err)});
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
