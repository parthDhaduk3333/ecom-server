import Product from "../models/Product";
import CustomErrorHandler from "../services/customErrorHandler";

class ProductController {
    async products(req, res, next) {
        const { subCategory } = req.params;
        const {populer,limit} = req.query;
        let products;
        try {
            if (!subCategory) {
                return next(CustomErrorHandler.error(400, "Please pass the category"));
            }
            products = await Product.find({ subCategory });
            return res.json({ products, success: true, msg: "All Products" });
        } catch (err) {
            return next(err);
        }
    }
    async filter(req, res, next) {
        
    }
    async product(req,res,next) {
        try {
            const {product} = req.params;
            if (!product) {
                return next(CustomErrorHandler.error(400,"Please enter all details"))
            }
            const singleproduct = await Product.findById(product).populate('subCategory');
            return res.json({success:true,product:singleproduct})
        } catch (err) {
            return next(err)
        }
    }
    async populerProduct (req,res,next) {
        const {toys} = req.query;
        if (toys == 'true') {
            try {
                const data = await Product.find({$and:[{populer:true},{category:'64198df762bc9861cd924d12'}]})
                return res.json({success:true,products:data})
            } catch (err) {
                return next(err)
            }
        } else {
            try {
                const data = await Product.find({$nor:[{category:"64198df762bc9861cd924d12"}],populer:true})
                return res.json({success:true,products:data})
            } catch (err) {
                return next(err)
            }
        }
    }
}

export default new ProductController();