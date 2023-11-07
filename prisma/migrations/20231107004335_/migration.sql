/*
  Warnings:

  - You are about to alter the column `rating` on the `RecipeRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `RecipeRating` MODIFY `rating` INTEGER NOT NULL;
