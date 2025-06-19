/*
  Warnings:

  - You are about to drop the column `email` on the `token` table. All the data in the column will be lost.
  - Added the required column `username` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` DROP COLUMN `email`,
    ADD COLUMN `username` VARCHAR(255) NOT NULL;
