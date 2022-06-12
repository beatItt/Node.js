const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const blogSchema=new Schema({
title:{
    type:String,
    required:true
},
snippet:{
    type:String,
    required:true
},
body:{
    type:String,
    required:true
}
},{timestamps:true});

//model wraps schema, capitalise model name, keep singular and map to collection(name is pluralised'blogs')
const Blog=mongoose.model('blog',blogSchema);
module.exports=Blog;


