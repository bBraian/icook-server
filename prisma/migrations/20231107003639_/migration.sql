/*
  Warnings:

  - Added the required column `rating` to the `RecipeRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recipe` MODIFY `image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `RecipeRating` ADD COLUMN `rating` INTEGER NOT NULL;
