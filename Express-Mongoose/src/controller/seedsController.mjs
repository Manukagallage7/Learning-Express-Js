import {Router} from 'express';
import User from '../model/userModel.mjs';
import Profile from '../model/profileModel.mjs';

const seedRouter = Router();

const userData = [
    {
        name: 'Manuka',
        username: 'Manuka1',
        email: 'manuka1@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Manuka',
        username: 'Manuka2',
        email: 'manuka2@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Senitha',
        username: 'Senitha1',
        email: 'seni@gmail.com',
        password: 'pass@123'
    }
]

const profileImage = [
    {
        image: "Image1"
    },
    {
        image: "Image2"
    }
]

seedRouter.get('/register-user-profile', async (req, res) => {
    try {
        const results = [];
        
        for (let index = 0; index < userData.length; index++) {
            const user = userData[index];
            
            const newUser = await User.create({
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
            });

            const newProfile = await Profile.create({
                image: profileImage[index].image,
                user: newUser._id
            });

            newUser.profile = newProfile._id;
            await newUser.save();
            
            results.push(newUser);
        }
    
        res.status(200).json({
            message: 'Users and Profiles seeded successfully',
            status: "Success",
            data: results
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

export default seedRouter;