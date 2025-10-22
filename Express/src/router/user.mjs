import {Router} from "express"
import {userInfo} from "../data/userinfo.mjs"
import DB from "../db/db.mjs"

const userRouter = Router()

//Get all users
userRouter.get('/allUsers',(req, res)=>{
    res.status(200).json({
        msg: 'get all users',
        data: userInfo,
    })
})

//Get user by ID
userRouter.get('/byUserId',(req, res)=>{
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

//create new User

userRouter.post('/create-user', async (req, res)=>{

    const userData = req.body
    console.log(userData)
    
    try {
        const newUser = await DB.user.create({data: userData})
        return res.status(201).json({newUser})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'User creation failed',
        })
    }
})




//Login



//Register




export default userRouter;