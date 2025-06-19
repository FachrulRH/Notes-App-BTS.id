import supertest from "supertest";
import {web} from "../src/application/web.js"
import {logger} from "../src/application/logging.js";
import {createTestUser, removeTestUser} from "./utils/users-utils.js";
import {createTestTodo, removeTestToDo, todoData, todoDataUpdate} from "./utils/todos-utils.js";
import {createTestNotes, removeTestNote} from "./utils/note-utils.js";

describe('POST /api/users/todo/create/:noteId', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should create todo', async () => {
        const data = await todoData()
        const result = await supertest(web)
            .post(`/api/users/todo/create/testnote`)
            .set('Authorization', 'userToken')
            .send(data)

        logger.info(result.body)

        expect(result.status).toBe(200)
    });

    it('should reject create todo, because id note mismatch', async () => {
        const result = await supertest(web)
            .post("/api/users/todo/create/123123")
            .set('Authorization', 'userToken')
            .send({})

        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    });
});

describe('PUT /api/users/todo/update/:noteId', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
        await createTestTodo()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should update todo', async () => {
        const dataUpdate = await todoDataUpdate()
        const result = await supertest(web)
            .put(`/api/users/todo/update/testnote`)
            .set('Authorization', 'userToken')
            .send(dataUpdate)

        logger.info(result.body)

        expect(result.status).toBe(200)
    });

    it('should reject update todo, because id mismatch', async () => {
        const dataUpdate = await todoDataUpdate()
        const result = await supertest(web)
            .put("/api/users/todo/update/123")
            .set('Authorization', 'userToken')
            .send(dataUpdate)

        logger.info(result.body)

        expect(result.status).toBe(404)
    })
});

describe('DELETE /api/users/todo/remove/:todoId', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
        await createTestTodo()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should remove todo', async () => {
        const result = await supertest(web)
            .delete(`/api/users/todo/remove/testtodo1`)
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
    })

    it('should reject remove todo, because id mismatch', async () => {
        const result = await supertest(web)
            .delete("/api/users/todo/remove/asdas")
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(404)
    })
});

describe('DELETE /api/users/todo/:todoId/substask/remove/:substaskId', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
        await createTestTodo()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should remove substask', async () => {
        const result = await supertest(web)
            .delete(`/api/users/todo/testtodo1/substask/remove/testsubtask1`)
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
    })

    it('should reject remove substask, because id mismatch', async () => {
        const result = await supertest(web)
            .delete("/api/users/todo/asdasd/substask/remove/testsubtask1")
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(404)
    })
});

describe('GET /api/users/todo/:todoId', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
        await createTestTodo()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should get todo by id', async () => {
        const result = await supertest(web)
            .get(`/api/users/todo/testtodo1`)
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
    });
});