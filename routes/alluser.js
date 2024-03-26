import express from "express";
import { User} from "../models/user.js";

const router = express.Router();

//API connection
router.get("/", async (req, res)=>{
    try {

        let users = await User.find();

        const userData = users.map(user => ({
            _id : user._id,
            name: user.username,
            email: user.email,
            password: user.password
        }));
        //sending success response
     res.status(200).json({message : `All User lists`, allusers : userData});

    } catch (error) {

        //throw error if anything goes wrong
        console.log(`There is a error while connecting to API : ${error}`);
        res.status(500).json({message : `Internal Server Error`});
    }
})

export const alluser = router;