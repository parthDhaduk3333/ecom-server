import Cart from "../models/Cart";
import CustomErrorHandler from "../services/customErrorHandler";

class CartController {
    async cart(req, res, next) {
        const { product, size } = req.body
        if (!product || !size) {
            return next(CustomErrorHandler.error(400, "Please Fill All Details"))
        }
        try {
            const find = await Cart.findOne({ 'product.product': product, 'product.size': size, 'user': req.user }).populate({ path: 'product', populate: 'product' })
            if (find) {
                find.product.item += 1;
                await find.save();
            } else {
                const cartItem = await Cart.create({
                    product: {
                        product,
                        size
                    },
                    user: req.user._id
                })
            }
        } catch (err) {
            return next(err)
        }
        try {
            const cartData = await Cart.find({user:req.user}).populate({ path: 'product', populate: 'product' })
            return res.json({ success: true, msg: "Add to Cart Successfully", cart:cartData })
        } catch (err) {
            return next(err)
        }
    }
    async getCart(req, res, next) {
        const { user } = req.params;
        if (!user) {
            return next(CustomErrorHandler.error(400, "Please Fill All Details"))
        }
        try {
            const cartData = await Cart.find({ user }).populate({ path: 'product', populate: 'product' });
            return res.json({ success: true, data: cartData })
        } catch (err) {
            return next(err)
        }
    }
    async delete(req, res, next) {
        const { product, size } = req.body
        if (!product || !size) {
            return next(CustomErrorHandler.error(400, "Please Fill All Details"))
        }
        try {
            const find = await Cart.findOne({ 'product.product': product, 'product.size': size, 'user': req.user }).populate({ path: 'product', populate: 'product' })
            if (!find) { 
                return next(CustomErrorHandler.error(400,"This Item Is Not Available"))
            }
            if (find.product.item > 1) {
                find.product.item -= 1;
                await find.save();
            } else if (find.product.item == 1) {
                await Cart.findByIdAndDelete(find._id)
            }
        } catch (err) {
            return next(err)
        }
        try {
            const cartData = await Cart.find({user:req.user}).populate({ path: 'product', populate: 'product' })
            return res.json({ success: true, msg: "Remove From Cart Successfully", cart:cartData })
        } catch (err) {
            return next(err)
        }
    }
}

export default new CartController();