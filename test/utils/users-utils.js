import moment from "moment-timezone";
import * as bcrypt from "bcrypt";
import {prismaClient} from "../../src/application/database.js";

const expiresAt = moment().add(7, 'days')

export const createTestUser = async () => {
    return prismaClient.users.create({
        data: {
            id: "user1",
            username: "User",
            email: "user@test.com",
            password: await bcrypt.hash("rahasia", 10),
            refresh_token: {
                create: {
                    id: "user1",
                    refresh_token: "userRefreshToken",
                    expired_at: expiresAt.toDate()
                }
            },
            Token: {
                create: {
                    id: "user1",
                    token: "userToken",
                    expired_at: expiresAt.toDate(),
                    username: "User",
                }
            },
        }
    })
}

export const removeTestUser = async () => {
    await prismaClient.token.deleteMany({})

    await prismaClient.refreshToken.deleteMany({})

    await prismaClient.users.deleteMany({})
}
