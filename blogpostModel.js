const mongoose=require('mongoose');

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