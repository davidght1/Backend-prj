import expressValidator from 'express-validator'

export default (req,res,next)=>{
    const errors = expressValidator.validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json(errors.array());
      }

      next();
}