import {Router} from 'express';
import DB from '../db/db.mjs';
import { comQValidate, comValidate } from '../utils/validatorMiddleware.mjs';
import { validationResult, matchedData  } from 'express-validator';
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

    res.sendStatus(200)
})

export default profileRouter;