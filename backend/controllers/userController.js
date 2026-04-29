import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res)=>{
    const {name, email, password} = req.body;
     if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const exisitingUser = await User.findOne({email});
    if (exisitingUser){
        return res.status(400).json({message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    // const newUser = await User.create({name, email, password});
    res.status(201).json({
        message: "New user created successfully!",
        newUser
    });
}

export const logIn = async (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Both fields required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({message: "Invalid password"})
    }

    // JWT Token
    const token = jwt.sign(
        {id: user._id, role:user.role},
        "secretkey",
        { expiresIn: "1d"}
    );
    res.json({
        message: "Login successful",
        token
    });
}

export const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
};