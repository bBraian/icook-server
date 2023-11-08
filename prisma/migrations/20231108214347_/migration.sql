/*
  Warnings:

  - You are about to drop the column `user_created` on the `recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `recipe_user_created_fkey`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `user_created`,
    ADD COLUMN `user_id` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `user_saved_recipes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_saved_recipes` ADD CONSTRAINT `user_saved_recipes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_saved_recipes` ADD CONSTRAINT `user_saved_recipes_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
