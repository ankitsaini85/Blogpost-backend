const express=require("express");
const server=express();
const cors = require('cors');
const port=3060;
const blogpost=require('./blogpostModel')
const bodyparser=require('body-parser')
server.listen(port,(req,res)=>{
    console.log(`server is listening at port ${port}`)
})
server.use(cors());

server.get('/',(req,res)=>{
    res.send("hello world")
})
server.get('/blogs',(req,res)=>{
    blogpost.find().sort({createdAt:-1})
    .then((blogs)=>{
        res.send(blogs)
    })
    .catch((err)=>{
        res.status(404).send("Error aa gyi yarr")
    })
})
server.get('/blogs/:id',(req,res)=>{
    const blog=req.params.id;
    blogpost.findById(blog)
    .then((result)=>{
        res.send(result)
       
    })
    .catch((err)=>{
        res.status(404).send("can not find with this id");
       
    })
})
// server.use(bodyparser.urlencoded({extended:true}))
server.use(express.json());
// server.use(bodyparser.json())
server.post('/blogs',(req,res)=>{
    const blog=req.body;
    // const newblog=new blogpost(blog);
    // newblog.save()
    // .then((blog)=>{
    //     res.send("new blog added");
    // })
    // .catch((err)=>{
    //     res.status(400).send("unable to create the new blog")
    // })
    blogpost.create(blog)
    .then((result)=>{
        res.send("new blog added");
        // res.send(result);
    })
    .catch((err)=>{
        res.send("unable to connect")
    })
})
server.delete('/blogs/:id',(req,res)=>{
    const blog=req.params.id;
    blogpost.findByIdAndDelete(blog)
    .then((result)=>{
        res.send("blog deleted successfully")
    })
    .catch((err)=>{
        res.status(400).send("can not delete blog with this id");
    })
})


