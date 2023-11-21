import User from "../../models/User";
import CustomErrorHandler from "../../services/customErrorHandler";

class LoginController {
    async login(req, res, next) {
        return res.json({ success: true, msg: "Login Successfully", user: req.user })
    }
    async logout(req, res, next) {
        try {
            req.logout((err) => {
                if (err) {
                    return next(err)
                }
                return res.json({ success: true, msg: "Logout Successfully" })
            });
        } catch (err) {
            return next(err)
        }
    }
    async loginFail(req, res, next) {
        return next(CustomErrorHandler.error(401, "Email or Password was incorrect"))
    }
    async getUser(req, res, next) {
        try {
            const data = await User.findById(req.user._id).populate('country')
            return res.json({success:true,user:data})
        } catch (err) {
            return next(err)
        }

    }
    async updateUser (req,res,next) {
        const user = req.user
        const userData = req.body
        console.log(userData.country)
        try {
            const userUpdate = await User.findByIdAndUpdate(user._id,userData,{new:true}).populate('country')
            return res.json({success:true,msg:"User Updateded Successfully",user:userUpdate})
        } catch (err) {
            return next(err)
        }
    }
}

export default new LoginController();