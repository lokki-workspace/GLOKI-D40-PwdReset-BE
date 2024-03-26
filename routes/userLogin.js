import express from "express";
import bcrypt from "bcrypt";
import { generateToken, getUserByEmail } from "../controllers/user.js";
import { User} from "../models/user.js";

const router = express.Router();

//Login
router.put("/", async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email})
    if(user){
        if(await bcrypt.compare(req.body.password,user.password)){
            res.status(200).json({
                message:"User Login Successfully",
            })
        }else{
            res.status(400).json({
                message:"Invaild Password"
            })
        }
        
    }else{
        res.status(400).json({
            message:"User Does't Exist"
        })
    }
} catch (error) {
    res.status(500).json({
        message:"Internal Server Error",
        error
    })
}
});

export const userLogin = router;
