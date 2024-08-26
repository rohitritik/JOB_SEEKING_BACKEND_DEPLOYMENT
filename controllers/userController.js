import { catchAsynError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import { Job } from "../models/jobSchema.js";

export const register = catchAsynError(async(req,res,next) => {
    const {name,email,phone,role,password} = req.body;
    
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill full registration form!"));
    }

    const isEmail = await User.findOne({email});
    if(isEmail){
       return next(new ErrorHandler("Email already exists!"));
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });

    // res.status(200).json({
    //     success: true,
    //     message: "User registered successfully",
    //     user,
    // });

    sendToken(user,200,res,"User Registered Sucessfully!");
});

export const login = catchAsynError(async(req,res,next) =>{
    const {email, password, role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email, password, and role.",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    sendToken(user,200,res,"User logged in successfully!"); 
})

export const logout = catchAsynError(async(req,res,next)=>{
    res.status(201).cookie("token", "",{
        httpOnly:true,
        expire:new Date(Date.now()),
        secure: true,
        sameSite: "None",
    }).json({
        success: true,
        message: "User logged out Successfully!",
    });
});


export const getUser = catchAsynError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


export const getSingleJob =  catchAsynError(async(req, res, next)=>{
    const {id} = req.params;
    try{
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found",404));
        }

        res.status(200).json({
            success : true,
            job,
        });
    }
    catch(error){
        return next(new ErrorHandler("Invalid ID/ casteError",400));
    }
})