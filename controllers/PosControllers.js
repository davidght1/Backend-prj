import postModel from '../models/post.js'

export const getAll = async (req,res)=>{
  try{
    const posts = await postModel.find().populate('user').exec()

    res.json(posts)
  } catch(err){
    console.log(e)
      res.status(500).json({message: "cant find posts"})
  }
}

export const getOne = async (req,res)=>{
  try{
    const postId = req.params.id;

    postModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: { viewsCount: 1 }
    }, 
      {
        returnDocument: 'ater',
      },
      (err,doc)=>{
        if(err){
          console.log(e)
          return res.status(500).json({message: "cant find post"})
        }

        if(!doc){
          return res.status(404).json({
            message: 'post is not exist'
          })
        }

        res.json(doc)
      }
    )
   
  } catch(err){
    console.log(e)
      res.status(500).json({message: "cant find posts"})
  }
}

export const create = async (req,res)=>{
    try{
         const doc = new postModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
         });
         const post = await doc.save();

         res.json(post);
    }
    catch(e){
        console.log(e)
      res.status(500).json({message: "cant create post"})
    }
}

export const remove = async (req,res)=>{
  try{
    const postId = req.params.id;

    postModel.findOneAndDelete({
      _id: postId
    },(err,doc)=>{
      if(err){
        console.log(e)
          return res.status(500).json({message: "cant delete post"})
      }

      if(!doc){
        console.log(e)
          return res.status(404).json({message: "post is not exist"})
      }

      res.json({
        success: true
      })
    })

   
  } catch(err){
    console.log(e)
      res.status(500).json({message: "cant find posts"})
  }
}

export const update= async (req,res)=>{
  try{
    const postId = req.params.id;

    await postModel.updateOne({
      _id: postId
    }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
    },
    )

    res.json({
      success: true
    })
  }catch(err){
    console.log(err)
    res.json({
      message: "faild to update post"
    })
  }
}

