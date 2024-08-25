const express=require("express");
const server=express();
const cors = require('cors');
const mongoose=require('mongoose');
const User=require('./AuthModel')
const port=3060;
const blogpost=require('./blogpostModel')
const bodyparser=require('body-parser')
const username = "ankit_saini85";
const password = "ankit7500057688";
const dbname = "merndb1";
const dburl=`mongodb+srv://${username}:${password}@merncluster.2k4wx.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=merncluster`;
// const promiseObj=mongoose.connect(dburl)
// promiseObj
// .then((res)=>{
//     console.log("connected to database")
// })
// .catch((err)=>{
//     console.log("could not connect to database",err);
// })
// server.listen(port,(req,res)=>{
//     console.log(`server is listening at port ${port}`)
// })
mongoose.connect(dburl)
    .then((result) => {
        console.log('Connected to database');
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    });

server.use(cors());

server.get('/',(req,res)=>{
    res.send("hello world !!!!!!!!!!!")
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

server.post('/auth/signup', (req, res) => {
    // 1. Extract the name, email and password from the request body
    const obj = req.body;
    console.log(obj);
    // 2. Create a new user in the database
    User.create(obj)
        .then(user => {
            // 2a. If user is created successfully, create a token,
            // // send it back as cookie, and redirect to all blogs page /blogs
            console.log('User created successfully');
             return res.send("done");
            // Create a token and send it back as a cookie
           
        })
        .catch(err => {
            // 2b. If user creation fails, send an error message with status code 400 (Bad Request)
            console.log(err);
            res.redirect('/auth/signup?error=Error creating user');
        });

});

server.post('/auth/login', (req, res) => {
    // 1. Extract the email and password from the request body
    const { email, password } = req.body;
    console.log(req.body);
    // 2. Search for the user in the database
    User.findOne({ email })
        .then(user => {
            if (!user) {
                // If user is not found,
                // send an error message with status code 400 (Bad Request)
                return res.redirect('/auth//login?error=User not found');
            }
            else if (user.password !== password) {
                // If password is incorrect,
                // send an error message with status code 400 (Bad Request)
                return res.redirect('/auth/login?error=Incorrect password');
            }
            else {
                // If user is found and password is correct, create a token,
                // // send it back as cookie, and redirect to all blogs page /blogs
                console.log('User logged in successfully');
                res.send("welcome log in")
                // Create a token and send it back as a cookie
               
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/auth/login?error=Error logging in');
        });
});


