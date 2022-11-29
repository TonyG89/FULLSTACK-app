import jwt from 'jsonwebtoken'

export default (req,res,next)=>{
    const token = (req.headers.authorication || "").replace(/Bearer\s?/, "")

    if( token){
        try {
            const decoded=jwt.verify(token, "mySecret")
            req.userId = decoded._id
            next()
        } catch (error) {
            
        }
    } else{
       return res.status(403).json({
            message: "нет доступа"
        })
    }
}