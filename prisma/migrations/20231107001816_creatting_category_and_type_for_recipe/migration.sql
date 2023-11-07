/*
  Warnings:

  - Added the required column `recipeCategoriesId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeTypesId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `recipeCategoriesId` INTEGER NOT NULL,
    ADD COLUMN `recipeTypesId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RecipeCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_recipeCategoriesId_fkey` FOREIGN KEY (`recipeCategoriesId`) REFERENCES `RecipeCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_recipeTypesId_fkey` FOREIGN KEY (`recipeTypesId`) REFERENCES `RecipeTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
