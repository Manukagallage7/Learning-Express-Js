import {Schema, model, Types} from "mongoose"
import Category from "./categoryModel.mjs";
import Product from "./productModel.mjs";

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
        ref: "Profile"
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

UserSchema.pre("deleteOne", async function(next){
    const user = await this.model.findOne(this.getQuery())
    if(user){
        const products = user.products
        if(products.length > 0){
            for(const product of products){
                await Category.updateMany(
                    {products: product},
                    {$pull: {products: product}}
                )
                await Product.deleteOne(
                    {_id: product}
                )
            }
        }
        await Profile.deleteOne({user: user._id})
    }
    next()
})



const User = model("User", UserSchema)

export default User;