import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });

        if (adminExists) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        // console.log("Admin created successfully");
        console.log("")
    } catch (error) {
        console.log("Error creating admin:", error.message);
    }
};