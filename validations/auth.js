import { body } from "express-validator";

export const registerValidation =[
    body('email', "invaild email").isEmail(),
    body('password', "minimum required 5 letter on password").isLength({min:5}),
    body('fullName', "minimum required 5 letter on full name").isLength({min:3}),
    // optional is mean its not must but if u got avatarurl check if its url
    body('avatarUrl', "url is not link!!").optional().isURL(),
    
];

export const loginValidation =[
    body('email', "invaild email").isEmail(),
    body('password', "minimum required 5 letter on password").isLength({min:5}),
]