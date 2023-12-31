/*
  Warnings:

  - You are about to drop the column `user` on the `recipe_rating` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `recipe_rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe_rating` DROP COLUMN `user`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `recipe_rating` ADD CONSTRAINT `recipe_rating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
