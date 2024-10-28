
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const models = require("../../models/index.model");
const { ROLES } = require("../../constants/role.constants");

const signup = async (req, res) => {
    const {
        email, password, role, username, photo
    } = req.body;

    if (!email || !password || !role || !username) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Please provide email, password, role and username",
        });
    }

    const alreadyExists = await models.userModel.findOne({
        email,
    });

    if (alreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            message: "User with that email already exists",
        });
    }

    if (role === ROLES.ADMIN) {
        const admins = await models.userModel.fiNnd({
            role: ROLES.ADMIN,
        });

        if (admins.length > 0) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "Admin already exists",
            });
        }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await new models.userModel({
        email,
        password: passwordHash,
        role,
        username,
        photo,
    }).save();

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        data: newUser,
    });
    
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Please provide email and password",
        });
    }

    const user = await models.userModel.findOne({
        email,
    });

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "User not found",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid password",
        });
    }

    const token = jwt.sign({
        id: user._id?.toString(),
    }, process.env.ACCESS_SECRET, {
        expiresIn: "30d",
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successful",
        data: {
            user,
            token,
        },
    });
}

module.exports = {
    signup,
    login,
};
