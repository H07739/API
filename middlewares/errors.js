const notfound=(req,res,next)=>{
    const error=new Error(`Not Found -- ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const er=(er,req,res,next)=>{
    const statusCode=res.statusCode == 200? 500: res.statusCode;
    res.status(statusCode).json({error :er.message});
}

module.exports ={
    notfound,
    er
}