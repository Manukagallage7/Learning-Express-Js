import {Router} from 'express';
import User from '../model/userModel.mjs';
import Profile from '../model/profileModel.mjs';

const seedRouter = Router();

const userData = [
    {
        name: 'Manuka',
        username: 'Manuka3',
        email: 'manuka3@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Manuka',
        username: 'Manuka4',
        email: 'manuka4@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Manuka',
        username: 'Manuka5',
        email: 'manuka5@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Manuka',
        username: 'Manuka6',
        email: 'manuka6@gmail.com',
        password: 'Manuka01'
    },
    {
        name: 'Manuka',
        username: 'Manuka7',
        email: 'manuka7@gmail.com',
        password: 'Manuka01'
    },
    
]

const profileImage = [
    {
        image: "Image3"
    },
    {
        image: "Image4"
    },
    {
        image: "Image5"
    },
    {
        image: "Image6"
    },
    {
        image: "Image7"
    },
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

// Fix index issue - drop the problematic unique index
seedRouter.get('/fix-indexes', async (req, res) => {
    try {
        // Drop the unique index on profile field
        await User.collection.dropIndex('profile_1');
        
        res.status(200).json({
            message: 'Index fixed successfully',
            status: "Success"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

// Clear all users and profiles
seedRouter.delete('/clear', async (req, res) => {
    try {
        await User.deleteMany({});
        await Profile.deleteMany({});
        
        res.status(200).json({
            message: 'All users and profiles cleared successfully',
            status: "Success"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "Failed"
        });
    }
})

export default seedRouter;