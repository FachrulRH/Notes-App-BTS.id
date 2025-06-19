import {
    getUserValidation,
    loginUserValidation, loginWithGoogleUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/auth-validation.js";
import {validate} from "../validation/validate.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import * as bcrypt from "bcrypt";
import moment from "moment-timezone";
import {generateRefreshToken, generateToken} from "../utils/generateToken.js";


const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const existingUser = await prismaClient.users.findFirst({
        where: {
            OR : [
                {email: user.email}
            ],
        },
        select: {
            username: true,
            email: true
        }
    })

    if (existingUser) {
        if (existingUser.email === user.email) {
            throw new ResponseError('Email telah terdaftar !')
        }

        if (existingUser.username === user.username) {
            throw new ResponseError('username telah terdaftar !')
        }
    }

    user.password = await bcrypt.hash(user.password, 10);
    const userMatch = await bcrypt.compare(user.confirm_password, user.password)

    if (!userMatch) {
        throw new ResponseError(400, "Password dan Confirm Password tidak sama !")
    }

    const {confirm_password, ...newUser} = user;

    const tokenRefreshExpired = moment(Date.now())
        .add(40, 'minutes')
        .toDate();

    const tokenExpired = moment(Date.now())
        .add(40, 'minutes')
        .toDate();

    const token = await generateToken({
        email: newUser.username,
    })

    const refreshToken = await generateRefreshToken({
        email: newUser.username,
    })

    const userCreate = await prismaClient.users.create({
        data: {
            ...newUser,
            refresh_token: {
                create: {
                    refresh_token: refreshToken,
                    expired_at: tokenRefreshExpired
                }
            },
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token: true,
        }
    })

    userCreate.token = await prismaClient.token.create({
        data: {
            token: token,
            expired_at: tokenExpired,
            username: user.username,
            user: {
                connect: {email: user.email}
            }
        },
        select: {
            id: true,
            token: true,
            expired_at: true,
            username: true
        }
    });

    return userCreate;
}

const login = async (request) => {
    const user = validate(loginUserValidation, request);

    const userInDatabase = await prismaClient.users.findUnique({
        where: {
            username: user.username
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token: true,
            refresh_token_id: true,
            password: true,
        }
    })

    if (!userInDatabase) {
        throw new ResponseError(400, 'Email atau Password salah !')
    }

    const isPasswordValid = await bcrypt.compare(user.password, userInDatabase.password)
    if (!isPasswordValid) {
        throw new ResponseError(400, 'Email atau Password salah !')
    }

    delete user.password;
    const refreshToken = await generateRefreshToken({
        email: user.username,
    })

    const token = await generateToken({
        email: user.username,
    })

    const currentDateTime = await moment().tz('Asia/Jakarta').toDate();
    const refreshTokenExpired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const tokenExpired = moment(currentDateTime)
        .add(40, 'minutes')
        .tz('Asia/Jakarta')
        .toDate();

    if (userInDatabase && userInDatabase.refresh_token) {
        await prismaClient.refreshToken.delete({
            where: {
                id: userInDatabase.refresh_token_id,
            }
        })
    }

    await prismaClient.users.update({
        where: {
            username: user.username,
        },
        data: {
            refresh_token: {
                create: {
                    refresh_token: refreshToken,
                    expired_at: refreshTokenExpired
                }
            }
        },
        select: {
            id: true,
        }
    })

    const tokenCreate = await prismaClient.token.create({
        data: {
            token: token,
            expired_at: tokenExpired,
            username: user.username,
            user: {
                connect: {username: user.username}
            }
        },
        select: {
            id: true,
            token: true,
            expired_at: true,
            username: true,
        }
    });

    const getUser = await prismaClient.users.findFirst({
        where: {
            username: user.username,
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token: {
               select: {
                   id: true,
                   refresh_token: true,
                   expired_at: true,
               }
            },
        }
    })

    getUser.token = tokenCreate

    return getUser;
}

const logout = async (request) => {
    const data = validate(getUserValidation, request);

    const tokenInDatabase = await prismaClient.token.findFirst({
        where: {
            token: data.token
        }
    })

    if (!tokenInDatabase) {
        throw ResponseError(404, "Token tidak ditemukan !")
    }

    await prismaClient.users.update({
        where: {
            id: data.user_id,
        },
        data: {
            refresh_token: {
                delete: true
            }
        }
    })

    await prismaClient.token.delete({
        where: {
            token: data.token,
            id: tokenInDatabase.id,
        }
    })
}

const refresh = async (request) => {
    const user = validate(getUserValidation, request);

    const getUser = await prismaClient.users.findUnique({
        where: {
            id: user.user_id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token_id: true,
        }
    })

    const getToken = await prismaClient.token.findFirst({
        where: {
            token: user.token,
        },
        select: {
            id: true,
        }
    })

    if (!getUser) {
        throw ResponseError(404, "Pengguna tidak ditemukan !")
    }

    const refreshTokenOnDatabase = await prismaClient.refreshToken.findFirst({
        where: {
            id: getUser.refresh_token_id
        }
    })

    if (!refreshTokenOnDatabase) {
        throw ResponseError(302, "Refresh token tidak ditemukan !")
    }

    const refreshTokenExpired = moment(refreshTokenOnDatabase.expired_at).tz('Asia/Jakarta');
    const currentDateTime = moment(new Date()).tz('Asia/Jakarta');

    if (!refreshTokenExpired.isAfter(currentDateTime)) {
        throw new ResponseError(302, "Refresh Token telah kadaluarsa, harap login kembali !")
    }

    const refreshToken = await generateRefreshToken({
        username: getUser.username,

    })

    const token = await generateToken({
        id: getUser.id,
        username: getUser.username,
    })

    const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const tokenExpires = await moment(currentDateTime)
        .add(40, 'minutes')
        .tz('Asia/Jakarta')
        .toDate();

    await prismaClient.refreshToken.delete({
        where: {
            id: getUser.refresh_token_id
        }
    })

    await prismaClient.token.delete({
        where: {
            id: getToken.id,
            email: getUser.token,
        }
    })

    const createToken = await prismaClient.token.create({
        data: {
            token: token,
            expired_at: tokenExpires,
            username: getUser.username,
            user: {
                connect: {id: user.user_id}
            }
        },
        select: {
            id: true,
            token: true,
            expired_at: true,
            username: true,
        }
    })

    const userUpdate = await prismaClient.users.update({
        where: {
            id: user.user_id,
        },
        data: {
            refresh_token: {
                create: {
                    refresh_token: refreshToken,
                    expired_at: refreshTokenExpires,
                }
            }
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token: true,
        }
    })

    userUpdate.token = createToken;

    return userUpdate;
}

const get = async (request) => {
    const user = validate(getUserValidation, request);

    const token = await prismaClient.token.findFirst({
        where: {
            user_id: user.user_id,
            token: user.token,
            expired_at: {
                gt: new Date()
            }
        },
        select: {
            id: true,
            token: true,
            expired_at: true,
            username: true
        }
    })

    const getUser = await prismaClient.users.findUnique({
        where: {
            id: user.user_id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            refresh_token: {
              select: {
                  refresh_token: true,
                  expired_at: true,
                  id: true,
              }
            },
        }
    })

    if (!token) {
        throw ResponseError(302, "Your session has expired, redirecting to login page!")
    }


    if (!user) {
        throw ResponseError(404, "Pengguna tidak ditemukan !")
    }

    getUser.token = token;

    return getUser;
}

export default {
    register,
    login,
    logout,
    refresh,
    get
}