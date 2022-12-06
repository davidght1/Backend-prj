import jwt from 'jsonwebtoken'

export default (req,res,next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if(token){
        try{
            const deconded = jwt.verify(token, 'secret123');

            req.userId = deconded._id;
            next();
        }
        catch(err){
            return res.status(403).json({
                message: "no token to get here"
            })
        }
    }
    else{
        return res.status(403).json({
            message: "no token to get here"
        })
    }

}