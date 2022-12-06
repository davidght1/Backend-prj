import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


import usermodel from '../models/User.js'


export const register = async (req,res)=>{
    try{
      
  
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
  
      const doc = new usermodel({
          email: req.body.email,
          fullname: req.body.fullName,
          avatarUrl: req.body.avatarUrl,
          passwordHash: hash,
      })
  
      const user = await doc.save();
  
      const token = jwt.sign({
          _id: user._id,
      }, 'secret123', {
         expiresIn: '30d' 
      })
  
      const {passwordHash, ...userData} = user._doc
  
      res.json({
          ...userData,
          token
      });
    }
    catch(err){
      console.log(err)
      res.status(500).json({message: "register failed"})
    }
  }
  
export const login = async (req,res)=>{
    try{
        const user = await usermodel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({
                message: "email is not exist on login"
            })
        }

        const isVaildPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isVaildPass){
            return res.status(404).json({
                message: "bad password on login"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
           expiresIn: '30d' 
        })
    
        const {passwordHash, ...userData} = user._doc
    
        res.json({
            ...userData,
            token
        });
      
    


        
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "login failed"}) 
    }
}

export const checkLogin = async (req,res)=>{
    try{
        const user = await usermodel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message:"user is not found"
            })
        }

        const {passwordHash, ...userData} = user._doc

    res.json(userData);
    
    }
    catch(err){
        return res.status(500).json({
            message: "no token to get here"
        })
    }
}

