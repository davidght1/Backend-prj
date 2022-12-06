import { body } from "express-validator";

export const  postCreateValidation=[
    body('title','write title please').isLength({min: 3}).isString(),
    body('text', 'write text').isLength({min: 3}).isString(),
    body('tags','no good format of tags').optional().isString(),
    body('imgUrl', 'no url exist').optional().isString(),
];