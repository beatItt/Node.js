const fs=require('fs'); // fs is core module of node

// read to file
// fs.readFile('./docs/text','utf8',(err,data)=>{
//     if(err){
//         consolelog(err);
//     }
        
//     console.log(data);//output is buffer, so used toString/encoding:utf8,
//     //  err is input reading data src not present
// });


//write to file
// fs.writeFile('./docs/file2.txt',"heylo world",(err)=>{
//     if(err){
//         console.log(err);
        
//     console.log("file is written")
//     }

// });

//create and del directories
//check if directory present, if present, delete it else create it
if(!fs.existsSync('./assets')){ //sync cmd
    fs.mkdir('./assets',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("assets dir created")
    });
}
else{

    fs.rmdir('./assets',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("assets dir removed")
    });
}

//deleting files use unlink
if(fs.existsSync("./docs/text")){
    fs.unlink('./docs/text',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("file text removed")
    });
}

