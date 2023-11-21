import Cart from "../models/Cart";
import Country from "../models/Country";
import Order from "../models/Order";

class OrderController {
    async order(req, res, next) {
        const { carts, payment } = req.body;
        try {
            const order = new Order({ product: [], user: req.user, payment, status: "Order Created" });
            await Promise.all(carts.map(async item => {
                const cart = await Cart.findById(item)
                order.product.push(cart.product)
            }))
            await order.save();
        } catch (err) {
            return next(err)
        }
        try {
            await Promise.all(carts.map(async item => {
                await Cart.findByIdAndDelete(item)
            }))
        } catch (err) {
            return next(err)
        }
        return res.json({ msg: "Order Placed Successfully", success: true });
    }
    async getorders(req, res, next) {
        try {
            const orders = await Order.find({ user: req.user }).populate({ path: 'product', populate: 'product' })
            return res.json({ success: true, orders })
        } catch (err) {
            return next(err)
        }
    }
    async getCountries(req, res, next) {
        try {
            const countries = await Country.find({});
            return res.json({success:true,countries});
        } catch (err) {
            return next (err)
        }
    }
}

export default new OrderController();