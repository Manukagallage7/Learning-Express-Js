import {Router} from "express"
import DB from "../db/db.mjs"
import { registerValidate, comValidate} from "../utils/validatorMiddleware.mjs"
import { validationResult, matchedData } from "express-validator"
import { resError } from "../utils/error-creator.mjs"
import { tokenGen} from "../utils/jwt.mjs"
import { checkAuth } from "../utils/authMiddleware.mjs"

const userRouter = Router()

//Get all users
userRouter.get('/allUsers', async(req, res)=>{

    try{
        const userData = await DB.user.findMany()
        return res.status(200).json({
            msg: 'Get All Users',
            data : userData,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "Failed to fetch users",
            data: null,
        })
    }
    
})

//Get user by ID
userRouter.get('/byUserId', async (req, res)=>{
    const {id} = req.query
    if(!id){
        return res.status(400).json({
            msg: 'User ID is required',
            data: null,
        })
    }

    try{
        const userData = await DB.user.findUnique({
            where: {Id: Number(id)}
        })
        return res.status(200).json({
            msg: 'Get User by ID',
            data : userData,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Failed the fetch user by ID',
            data: null,
        })
    }

})

//create new User

userRouter.post('/create-user', async (req, res)=>{

    const userData = req.body
    console.log(userData)
    
    try {
        const newUser = await DB.user.create({data: userData})
        return res.status(201).json({
            msg: 'User Created Successfully',
            data: newUser,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'User creation failed',
        })
    }
})

//Update User

userRouter.put('/update-user', async (req, res)=>{
    const id = req.body.id || req.query.id
    if(!id){
        return res.status(400).json({
            msg: 'User ID is required',
            data: null,
        })
    }

    try{
        const updatedUser = await DB.user.update({
            where: {Id: Number(id)},
            data: {
                Name: req.body.Name,
                Username: req.body.Username,
                Email: req.body.Email,
                Password: req.body.Password,
            }
        })
        return res.status(200).json({
            msg: 'User Updated Successfully',
            data: updatedUser,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'User Update failed',
            data: null,
        })
    }
})

//Delete User 

userRouter.delete('/delete-user', async (req, res)=>{
    const id = (req.body && req.body.id) || req.query.id
    
    if(!id){
        return res.status(400).json({
            msg: 'User ID is required',
            data: null,
        })
    }
    try{
        const deletedUser = await DB.user.delete({
            where: {Id: Number(id)},
        })
        return res.status(200).json({
            msg: 'User Deleted Successfully',
            data: deletedUser,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'User Delete failed',
            data: null,
        })
    }
})


//Register User with validation
userRouter.post('/register', registerValidate() , async (req, res)=> {
    const error = validationResult(req)
    const lerr = resError(error.array())
    if(error.array().length){
        return res.status(400).json({
            msg: 'error',
            error: lerr,
            data: null,
        })
    }
    const data = matchedData(req)
    console.log(data)

    try{
        await DB.user.create({data})
        return res.status(200).json({
            msg: 'User Created Successfully',
            data: null,
        })
    }catch(error){
        console.log(error)
        if(error.code === 'P2002'){
            return res.status(500).json({
                msg: 'User already exists',
                data: null,
            })
        }
        return res.status(500).json({
            msg: 'Database error occurred',
            data: null,
        })
    }
})


//Login User with validation
userRouter.post('/login', comValidate('Username', 'Password') , async (req, res)=> {
    const error = validationResult(req)
    const lerr = resError(error.array())
    if(error.array().length){
        return res.status(400).json({
            msg: 'error',
            error: lerr,
            data: null,
        })
    }
    const data = matchedData(req)
    console.log(data)

    try{
        const user = await DB.user.findUnique({
            where: {
                Username: data.Username
            }
        })
        if(user!==null){
            if(user.Password === data.Password){
                const payload = {
                    username:user.Username,
                }
                const token = tokenGen(payload)
                console.log(token);
                return res.status(200).json({
                    msg: 'Login Successful',
                    error: null,
                    data: {
                        token: token,
                    }
                })
            }
            return res.status(400).json({
                msg: "error",
                error: 'password is incorrect',
                data: null,
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Database error occurred',
            data: null,
        })
    }
})

userRouter.post('/validate', checkAuth, (req, res)=>{
    return res.status(200).json({
        msg: "Success",
        error: null,
        data: "token verified",
    })
})


export default userRouter;