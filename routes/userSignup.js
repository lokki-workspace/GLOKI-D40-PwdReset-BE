import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateToken, getUserByEmail } from "../controllers/user.js";
import { User} from "../models/user.js";

const router = express.Router();

router.post("/", async(req,res)=>{
  try {
      const user = await User.findOne({email:req.body.email})
      if(!user){
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(req.body.password, salt)
          req.body.password = hashedPassword
          const user = await User.create(req.body)
          res.status(200).json({
              message:"User Signup Successfully"
          })
      }else{
          res.status(400).json({
              message:"User Already Exists"
          })
      }
      
  } catch (error) {
      res.status(500).json({
          message:"Internal Server Error",
          error
      })
  }
})

export const userSignup = router;