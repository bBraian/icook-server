/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `user_session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_session` MODIFY `token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_session_token_key` ON `user_session`(`token`);
