import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({message: "Name is required!"})
    }
    const newCategory = await Category.create({name});
    res.json({message: "Category created successfully!", newCategory});
}

export const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}