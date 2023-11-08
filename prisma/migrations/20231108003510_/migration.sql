/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_created_fkey` FOREIGN KEY (`user_created`) REFERENCES `user`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
