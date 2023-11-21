import CustomErrorHandler from "../../services/customErrorHandler";
import bcrypt from 'bcrypt';
import User from "../../models/User";
import Joi from 'joi';

class RegisterController {
    async register(req, res, next) {
        const { email, password, name, mobile, addressLine1, addressLine2, city, state, pin, country } = req.body;
        if (!email || !password || !name || !mobile || !addressLine1 || !city || !state || !pin || !country) {
            return next(CustomErrorHandler.error(400, "Please Fill All Details"));
        }
        const dataCheck = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().length(10),
            name: Joi.string(),
            mobile: Joi.number().max(9999999999).min(1000000000),
            addressLine1:Joi.string(),
            addressLine2:Joi.string(),
            city:Joi.string(),
            state:Joi.string(),
            pin:Joi.string().length(6),
            country:Joi.string()
        })
        const {error} = dataCheck.validate({ email, password, name, mobile, addressLine1, addressLine2, city, state, pin, country })
        if (error) {
            return next(error)
        }
        try {
            const exists = await User.exists({ email });
            if (exists) {
                return next(CustomErrorHandler.error(400, "This User is already registered"))
            }
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                email,
                password: hashPassword,
                name,
                mobile,
                addressLine1,
                addressLine2,
                city,
                state,
                pin,
                country
            })
            return res.json({ msg: "User Register Successfully", success: true, user })
        } catch (err) {
            return next(err);
        }
    }
}

export default new RegisterController();