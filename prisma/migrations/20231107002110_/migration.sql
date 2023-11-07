/*
  Warnings:

  - You are about to drop the column `recipeCategoriesId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `recipeTypesId` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `recipe_categories_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_types_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_recipeCategoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_recipeTypesId_fkey`;

-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `recipeCategoriesId`,
    DROP COLUMN `recipeTypesId`,
    ADD COLUMN `recipe_categories_id` INTEGER NOT NULL,
    ADD COLUMN `recipe_types_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_recipe_categories_id_fkey` FOREIGN KEY (`recipe_categories_id`) REFERENCES `RecipeCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_recipe_types_id_fkey` FOREIGN KEY (`recipe_types_id`) REFERENCES `RecipeTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
