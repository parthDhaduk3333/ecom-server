import Category from "../models/Category";
import SubCategory from "../models/SubCategory";
import CustomErrorHandler from "../services/customErrorHandler";

class CategoryController {
    async getSubCategory(req, res, next) {
        const { category } = req.params;
        console.log(req.params)
        if (!category) {
            return next(CustomErrorHandler.error(400, "Please Fill All Details"))
        }
        try {
            const subcategories = await SubCategory.find({ category }).populate('category')
            return res.json({ success: true, data: subcategories })
        } catch (err) {
            return next(err)
        }
    }
    async categories (req,res,next) {
        try {
            const categories = await Category.find({});
            return res.json({success:true,categories})
        } catch (err) {
            return next(err)
        }
    }
}

export default new CategoryController();