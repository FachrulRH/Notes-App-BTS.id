-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_note_id_fkey`;

-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_subtask_id_fkey`;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_note_id_fkey` FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_subtask_id_fkey` FOREIGN KEY (`subtask_id`) REFERENCES `todo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
