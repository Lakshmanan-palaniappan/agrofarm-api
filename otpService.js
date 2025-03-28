const otpServices=require('./otpVerify')


exports.otpLogin=(req,res,next)=>{
    otpServices.createOtp((req.body),(error,results)=>{
        if(error){
            return next(error)
        }
        return res.status(200).send({
            message:"Success",
            data:results
        })
    })
}

exports.verifyOtp=(req,res,next)=>{
    otpServices.verifyOtp(req.body,(error,results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:"Otp Verified",
            data:results
        })
    })
}