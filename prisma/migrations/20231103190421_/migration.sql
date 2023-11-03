/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserSession` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserSession_user_id_fkey` ON `UserSession`;

-- CreateIndex
CREATE UNIQUE INDEX `UserSession_user_id_key` ON `UserSession`(`user_id`);
