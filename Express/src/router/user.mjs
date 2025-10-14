import {Router} from "express"
import {userInfo} from "../data/userinfo.mjs"

const userRouter = Router()

//Get all users
userRouter.get('/api/v1/user/allUsers',(req, res)=>{
    res.status(200).json({
        msg: 'get all users',
        data: userInfo,
    })
})

//Get user by ID
userRouter.get('/api/v1/user/byUserId',(req, res)=>{
    const {id} = req.query
    if(!id){
        return res.status(400).json({
            msg: 'User ID is required',
            data: null,
        })
    }
    const user = userInfo.find(user => user.id === parseInt(id))
    return res.status(200).json({
        msg: 'get user by ID',
        data: user,
    })

})




//Login



//Register




export default userRouter;