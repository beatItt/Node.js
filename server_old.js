const http=require('http');//core module of node
const server=http.createServer((req,res)=>{// requestLinstener, fires when req received from browser
console.log("req received");
});

server.listen(3000,'localhost',()=>{ //async calls when serve rstarts to listen, callbk fired
   console.log("listening for req"); 
});