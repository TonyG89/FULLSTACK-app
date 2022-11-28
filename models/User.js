import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    tel: {
        type: Number,
        require: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    avataryUrl: String
},
{
    timeStamps:true,
},
)

export default mongoose.model("User", UserSchema)