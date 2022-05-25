const {people, ages} = require('./people');//relative path, destructure {Age,People}, 
// import only wat's needed

// console.log(`I love following ${People}`);//template literal can be used to output variable `${}`
console.log(people,ages);
// setTimeout(() => {
//     console.log("in timeout");
//     clearInterval(interval);
// }, 3000);


// const interval=setInterval(()=>{
//     console.log("in interval");
// },1000);

console.log(__dirname,__filename);