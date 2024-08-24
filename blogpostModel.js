const mongoose=require('mongoose');
const username = "ankit_saini85";
const password = "ankit7500057688";
const dbname = "merndb1";
const dburl=`mongodb+srv://${username}:${password}@merncluster.2k4wx.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=merncluster`;
const promiseObj=mongoose.connect(dburl)
promiseObj
.then((res)=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log("could not connect to database",err);
})
const schema=mongoose.Schema;
const blogpostSchema=new schema({
    id:{type:Number,required:true},
        title:{type:String,required:true},
        summary:{type:String,required:true},
        content:{type:String,required:true},
        author:{type:String,required:true},
    },{timestamps:true}
)
const blogpost=mongoose.model('blog',blogpostSchema,'blogpost1')
// for(let i=1;i<=20;i++){
//         const newBlog=new blogpost({
//             id:`${i}`,
//             title:`title ${i}`,
//             summary:`summary ${i}`,
//             content:`content ${i}`,
//             author:`Author ${i}`
        
//             })
//         //save the blog post to the database
//         newBlog.save()
//         .then((result)=>{
//             console.log(`saving the blog post${i}  `)
//             // console.log(result)
//         })
//         .catch((err)=>{
//             console.log("error saving the blog post")
//             console.log(err)
//         })
//     }
module.exports=blogpost;