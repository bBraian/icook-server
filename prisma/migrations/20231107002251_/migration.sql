/*
  Warnings:

  - You are about to drop the column `recipeId` on the `RecipeIngredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `RecipeRating` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `RecipeSteps` table. All the data in the column will be lost.
  - Added the required column `private` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipeRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipeSteps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RecipeIngredients` DROP FOREIGN KEY `RecipeIngredients_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeRating` DROP FOREIGN KEY `RecipeRating_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeSteps` DROP FOREIGN KEY `RecipeSteps_recipeId_fkey`;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `private` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `RecipeIngredients` DROP COLUMN `recipeId`,
    ADD COLUMN `recipe_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `RecipeRating` DROP COLUMN `recipeId`,
    ADD COLUMN `recipe_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `RecipeSteps` DROP COLUMN `recipeId`,
    ADD COLUMN `recipe_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `RecipeIngredients_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeSteps` ADD CONSTRAINT `RecipeSteps_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeRating` ADD CONSTRAINT `RecipeRating_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
