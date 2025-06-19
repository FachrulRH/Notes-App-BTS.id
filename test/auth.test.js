import supertest from "supertest";
import {web} from "../src/application/web.js"
import {logger} from "../src/application/logging.js";
import {createTestUser, removeTestUser} from "./utils/users-utils.js";

describe('POST /api/users/register', () => {

    afterEach(async () => {
        await removeTestUser();
    })
    
    it('should create register user', async () => {
        const result = await supertest(web)
            .post("/api/users/register")
            .send({
                username: "Test",
                email: "user@test.com",
                password: "rahasia",
                confirm_password: "rahasia",
            })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Test")
        expect(result.body.data.email).toBe("user@test.com");
        expect(result.body.data.password).toBeUndefined();
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.refresh_token).toBeDefined();
    });

    it('should reject register user', async () => {
        const result = await supertest(web)
            .post("/api/users/register")
            .send({
                username: "",
                email: "",
                password: "",
                confirm_password: "",
            })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});

describe('POST /api/users/login', () => {
    
    beforeEach(async () => {
        await createTestUser()
    })
    
    afterEach(async () => {
        await removeTestUser();
    })

    it('should accept login user', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "User",
                password: "rahasia",
            })

        logger.info(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe("user1");
        expect(result.body.data.token.token).not.toBe("userToken");
        expect(result.body.data.refresh_token.refresh_token).not.toBe("userRefreshToken");
        expect(result.body.data.username).toBe("User")
        expect(result.body.data.email).toBe("user@test.com");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject login user', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: "",
                password: "",
            })

        logger.info(result.body);

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
})

describe('POST /api/users/logout', () => {

    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should logout user', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'userToken')

        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("Logout Success")
    })
})

describe('POST /api/users/refresh', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should refresh token', async () => {
        const result = await supertest(web)
            .put('/api/users/refresh')
            .set('Authorization', 'userToken')

        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.token.token).not.toBe("userToken");
        expect(result.body.data.refresh_token.refresh_token).not.toBe("userRefreshToken");
    })
})

describe('GET /api/users/current', () => {

    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'userToken')

        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe("user1");
        expect(result.body.data.token.token).toBe("userToken");
        expect(result.body.data.token.expired_at).toBeDefined();
        expect(result.body.data.refresh_token.refresh_token).toBe("userRefreshToken");
        expect(result.body.data.refresh_token.expired_at).toBeDefined();
        expect(result.body.data.username).toBe("User")
        expect(result.body.data.email).toBe("user@test.com");
        expect(result.body.data.password).toBeUndefined();
    })
})