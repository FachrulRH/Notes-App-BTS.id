import supertest from "supertest";
import {web} from "../src/application/web.js"
import {logger} from "../src/application/logging.js";
import {createTestNotes, removeTestNote} from "./utils/note-utils.js";
import {createTestUser, removeTestUser} from "./utils/users-utils.js";
import {createTestTodo, removeTestToDo} from "./utils/todos-utils.js";

describe('POST /api/users/note/create', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
    })

    afterEach(async () => {
        await removeTestNote()
        await removeTestUser()
    })

    it('should create note', async () => {
        const result = await supertest(web)
            .post("/api/users/note/create")
            .set('Authorization', 'userToken')
            .send({
                title: "Test Notes",
            })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.title).toBe("Test Notes")
    });

    it('should reject create note, because not validate', async () => {
        const result = await supertest(web)
            .post("/api/users/note/create")
            .set('Authorization', 'userToken')
            .send({})

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});

describe('PUT /api/users/note/update/:noteId', () => {

    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestToDo()
        await removeTestNote()
        await removeTestUser()
    })

    it('should update note', async () => {
        const createNotes= await createTestNotes()
        const result = await supertest(web)
            .put(`/api/users/note/update/${createNotes.id}`)
            .set('Authorization', 'userToken')
            .send({
                title: "Test Notes Baru",
            })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.title).toBe("Test Notes Baru")
        expect(result.body.data.created_at).toBeDefined()
        expect(result.body.data.updated_at).toBeDefined()
        expect(result.body.data.id).toBe(createNotes.id)
    });

    it('should reject update note, because id mismatch', async () => {
        const result = await supertest(web)
            .put("/api/users/note/update/123")
            .set('Authorization', 'userToken')
            .send({})

        logger.info(result.body)

        expect(result.status).toBe(404)
    })
});

describe('DELETE /api/users/note/remove/:noteId', () => {

    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestNote()
        await removeTestUser()
    })

    it('should remove note', async () => {
        const createNotes= await createTestNotes()
        const result = await supertest(web)
            .delete(`/api/users/note/remove/${createNotes.id}`)
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
    })

    it('should reject remove note, because id mismatch', async () => {
        const result = await supertest(web)
            .delete("/api/users/note/remove/32")
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(404)
    })
});

describe('GET /api/users/note', () => {

    beforeEach(async () => {
        await createTestUser()
        await createTestNotes()
    })

    afterEach(async () => {
        await removeTestNote()
        await removeTestUser()
    })

    it('should get list note', async () => {
        const result = await supertest(web)
            .get('/api/users/note')
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBeDefined()

    });
});

describe('GET /api/users/note/:noteId', () => {

    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestNote()
        await removeTestUser()
    })

    it('should get note by id', async () => {
        const createNotes= await createTestNotes()
        const result = await supertest(web)
            .get(`/api/users/note/${createNotes.id}`)
            .set('Authorization', 'userToken')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.title).toBe("Test Notes")
    });
});