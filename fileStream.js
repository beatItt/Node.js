const fs=require('fs');

const myReadStream=fs.createReadStream('./docs/file2.txt',{encoding:'utf8'});
const myWriteStream=fs.createWriteStream('./docs/writeFile');


//listen on data event on myReadStream
myReadStream.on('data',(chunk)=>{


console.log("--NEW CHUNK-------")
console.log(chunk);
myWriteStream.write("\nNew Chunk\n");
myWriteStream.write(chunk);

});

//piping read's output to write to file
myReadStream.pipe(myWriteStream);

//writeStream using writeb method