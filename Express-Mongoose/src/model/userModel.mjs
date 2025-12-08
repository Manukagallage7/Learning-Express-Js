import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        unique: true
    },
    products:[
        {
            type: Types.ObjectId,
            ref: 'Product'
        }
    ]
},{
    timestamps: true
})



const User = model("User", UserSchema)

export default User;