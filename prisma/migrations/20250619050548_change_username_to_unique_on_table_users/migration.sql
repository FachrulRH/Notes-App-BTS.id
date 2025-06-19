/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `token_username_key` ON `token`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
