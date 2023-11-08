/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `recipe_user_created_fkey`;

-- DropIndex
DROP INDEX `user_name_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_created_fkey` FOREIGN KEY (`user_created`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
