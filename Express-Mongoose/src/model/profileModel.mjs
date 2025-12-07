import { model, Schema} from "mongoose"

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

const Profile = model("Profile", profileSchema)

export default Profile;