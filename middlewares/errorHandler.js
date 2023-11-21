import { DEBUG_MODE } from "../config";
import CustomErrorHandler from "../services/customErrorHandler";
import { ValidationError } from 'joi'

const errorHandler = (err, req, res, next) => {
    let message = {
        status: 500,
        msg: "Internal server error",
        ...(DEBUG_MODE == 'true' && { originalMessage: err.message }),
        success: false
    }
    if (err instanceof CustomErrorHandler) {
        message = {
            status: err.status,
            msg: err.message,
            success: false
        }
    }
    if (err instanceof ValidationError) {
        message = {
            status: 403,
            msg: err.message,
            success: false
        }
    }
    return res.json(message)
}

export default errorHandler;