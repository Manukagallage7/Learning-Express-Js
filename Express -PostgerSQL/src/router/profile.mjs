import {Router} from 'express';
import DB from '../db/db.mjs';
import { comQValidate, comValidate } from '../utils/validatorMiddleware.mjs';
import { validationResult, matchedData, param  } from 'express-validator';
import { resError } from '../utils/error-creator.mjs';

const profileRouter = Router();

//get all profiles

profileRouter.get('/all',  async (req, res)=> {
    try{
        const allProfiles = await DB.profile.findMany({
            select: {
                Image: true,
                AccountDetails: {
                    select: {
                        Name: true,
                        Username: true,
                    }
                }
            }
        })
        return res.status(200).json({
            msg: "All User Profiles",
            error: null,
            data: allProfiles
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "error",
            error: "database error",
            data: null
        })
    }
})

//get profile by user id
profileRouter.get('/:id',
    param('id').notEmpty().isNumeric().withMessage('Enter id as Number'),
    async (req, res)=> {
        const error = validationResult(req)
        const err = resError(error.array())

        if(error.array().length){
            return res.status(400).json({
                msg: "error",
                error: err,
                data: null,
            })
        }
        const data = matchedData(req)
        console.log(data)

    try{
        const Profile = await DB.profile.findUnique({
            select: {
                Image: true,
                AccountDetails: {
                    select: {
                        Name: true,
                        Username: true,
                    },
                },
            },
            where: {
                Id: Number(data.id)
            },
        })
        return res.status(200).json({
            msg: "All User Profiles",
            error: null,
            data: Profile
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "error",
            error: "database error",
            data: null
        })
    }
})

//create new profile
profileRouter.post('/create', comQValidate('UserId'), comValidate('Image'), async (req, res)=> {
    const error = validationResult(req)
    const err = resError(error.array())

    if(error.array().length){
        return res.status(400).json({
            msg: "error",
            error: err,
            data: null
        })
    }
    const data = matchedData(req)
    console.log(data)

    try{
        const newProfile = await DB.profile.create({
            data: {
                UserId: parseInt(data.UserId),
                Image: data.Image,
            }
        })

        return res.status(201).json({
            msg: "new profile created",
            error: null,
            data: newProfile
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "error",
            error: "database error",
            data: null
        })
    }
})

//update profile
profileRouter.put('/update', comQValidate('UserId'), comValidate('Image'), async (req, res)=> {
    const error = validationResult(req)
    const err = resError(error.array())

    if(error.array().length){
        return res.status(400).json({
            msg: "error",
            error: err,
            data: null
        })
    }
    const data = matchedData(req)
    console.log(data)

    try{
        const updateProfile = await DB.profile.update({
            data: {
                Image: data.Image,
            },
            where: {
                UserId: Number(data.UserId),
            }
        })

        return res.status(201).json({
            msg: "Update profile successful",
            error: null,
            data: updateProfile
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "error",
            error: "database error",
            data: null
        })
    }
})

//delete profile
profileRouter.delete('/delete', comQValidate('UserId'), comValidate('Image'), async (req, res)=> {
    const error = validationResult(req)
    const err = resError(error.array())

    if(error.array().length){
        return res.status(400).json({
            msg: "error",
            error: err,
            data: null
        })
    }
    const data = matchedData(req)
    console.log(data)

    try{
        const Profile = await DB.profile.delete({
            where: {
                UserId: Number(data.UserId),
            },
            select: {
                AccountDetails: {
                    select: {
                        Name: true
                    }
                }
            }
        })

        return res.status(201).json({
            msg: "Profile deleted successful",
            error: null,
            data: `${Profile.AccountDetails.Name}'s profile deleted`
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "error",
            error: "database error",
            data: null
        })
    }
})

export default profileRouter;