import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    nickName:{
        type:String,
        required:true,
    },
    tel: {
        type: Number,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avataryUrl: String
},
{
    timeStamps:true,
},
)

export default mongoose.model("User", UserSchema)