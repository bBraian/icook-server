/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `RecipeIngredients` table. All the data in the column will be lost.
  - Added the required column `ingredient_id` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RecipeIngredients` DROP FOREIGN KEY `RecipeIngredients_ingredientId_fkey`;

-- AlterTable
ALTER TABLE `RecipeIngredients` DROP COLUMN `ingredientId`,
    ADD COLUMN `ingredient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `RecipeIngredients_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
