const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title:String,
    Des:String,
    owner:{
        type: mongoose.Types.ObjectId,
        ref:'AuthUser1'
    },
    Img:{
        type: mongoose.Schema.Types.Mixed,
        
    },
    PostComments:[]
})

module.exports = mongoose.model('post1', PostSchema)