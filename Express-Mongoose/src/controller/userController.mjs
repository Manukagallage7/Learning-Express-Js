import {Router} from "express";
import User from '../model/userModel.mjs'
import Profile from '../model/profileModel.mjs'

const userRouter = Router();

userRouter.post('/', async(req,res)=> {
    const data = req.body;
    try{
            const newUser = await User.create(data)
            return res.status(201).json(
                {
                    message: "User created successfully",
                    status: "Success",
                    data: newUser
                }
            )
    }catch(err){
        return res.status(500).json(
            {
                message: err.message,
                status: "Failed"
            }
        )
    }

})

userRouter.get('/',async(req,res)=> {
    try{
        const users = await User.find()
        return res.status(200).json(
            {
                message: "Users retrieved successfully",
                status: "Success",
                data: users
            }
        )
    } catch(err){
        return res.status(500).json(
            {
                message: err.message,
                status: "Failed"
            }
        )
    }
})

userRouter.get('/profile/:userId', async(req,res)=> {
    try{
        const user = await User.findById(req.params.userId).populate('profile').select(["profile","username"])
        res.status(200).json(
            {
                message: "User profile retrieved successfully",
                status: "Success",
                data: user
            }
        )
    }
    catch(err){
        return res.status(500).json(
            {
                message: err.message,
                status: "Failed"
            }
        )
    }
})

userRouter.get('/:id', async(req,res)=> {
    try{
        const user = await User.findById(req.params.id)
        return res.status(200).json(
            {
                message: "User retrieved successfully",
                status: "Success",
                data: user
            }
        )
    }catch(err){
        return res.status(500).json(
            {
                message: err.message,
                status: "Failed"
            }
        )
    }
})

userRouter.put('/profile/:userId', async(req,res)=> {
    const { image } = req.body;

    try{
        const profile = await Profile.create({ user: req.params.userId, image: image });
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { profile: profile._id },
            { new: true }
        );
        console.log(profile)
        console.log(user)

        return res.status(200).json(
            {
                message: "User profile updated successfully",
                status: "Success",
                data: user
            }
        )
    }
    catch(err){
        return res.status(500).json(
            {
                message: err.message,
                status: "Failed"
            }
        )
    }
})

export default userRouter;