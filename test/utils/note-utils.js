import {prismaClient} from "../../src/application/database.js";

export const createTestNotes = async () => {

    return prismaClient.note.create({
        data: {
            id: "testnote",
            title: "Test Notes",
            users: {
                connect: {
                    id: "user1"
                }
            },
        },
        select: {
            id: true
        }
    })
}

export const removeTestNote = async () => {
    await prismaClient.note.deleteMany({})
}