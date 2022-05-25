const http=require('http');
const fs=require('fs');
const _ =require('lodash');

//create server, log request
const server=http.createServer((req,res)=>{
   const num= _.random(2,90);
   console.log(num);

    console.log(req.url,req.method);

    //setting response
    res.setHeader('Content-type','text/html');

    let path='./views/';
    switch(req.url){
        case '/':
            res.statusCode=200;
            path+='index_old.html';
            break;
        case '/about':
            res.statusCode=200;
            path+='about_old.html';
            break;
        case '/about-me':
            //redirect to about using res.setHeader location, set redirect status code 301
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();// e nd res here cuz new req will be in form of new rout /about
        default:
            res.statusCode=404;
            path+='404_old.html';
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            //request should be not hanging, so send response to browser
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000,'localhost',()=>{
    console.log("listening to requests on prt 3000");
   
});
