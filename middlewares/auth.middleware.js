const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const models = require('../models/index.model');
const ACCESS_SECRET = process.env.ACCESS_SECRET;

const verifyToken = async (req, res, next) => {
    try {
        let token = req.get('authorization');
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Authentication Token Not Provided!',
            });
        }
        let id;
        token = token?.split(' ')[1];
        token = token?.trim();
        try {
            const { id: userID } = jwt.verify(token, ACCESS_SECRET);
            id = userID?.trim();
        } catch (e) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid Token!" });
        }
        if (!id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid Token!',
            });
        }
        let user = await models.userModel.findById(id);

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'User not found!',
            });
        }
        req.user = user.toObject();
        req.user.id = req.user._id.toString();
        return next();
    } catch (error) {
        next(error);
    }
};

const checkRoles = (roles) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = roles.trim().length > 0 ? [roles] : [];
        }
        if (roles.length === 0 || roles.includes(req.user.role)) {
            return next();
        }
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: 'You are not authorized!',
        });
    };
};

module.exports = {
    verifyToken,
    checkRoles,
};