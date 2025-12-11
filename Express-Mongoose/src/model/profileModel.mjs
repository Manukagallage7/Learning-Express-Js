import { model, Schema} from "mongoose"
import User from './userModel.mjs';

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        required: true,
        type: String,
        trim: true
    },
    bio: {
        required: false,
        type: String,
        trim: true,
        maxlength: 250
    }
},{
    timestamps: true
})

profileSchema.pre("deleteOne", async function(next) {
    const profile = await this.model.findOne(this.getQuery())
    if(profile){
        await User.updateOne(
            {profile: profile._id},
            {profile: null})
    }
    next()
})

const Profile = model("Profile", profileSchema)

export default Profile;