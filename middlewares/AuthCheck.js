import CustomErrorHandler from "../services/customErrorHandler";

class AuthCheck {
    async login(req,res,next) {
        if (req.isAuthenticated()) {
            return next()
        }
        return next(CustomErrorHandler.error(401,"unauthorized"))
    }
}

export default new AuthCheck();