/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeSteps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_recipe_categories_id_fkey`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_recipe_types_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIngredients` DROP FOREIGN KEY `RecipeIngredients_ingredient_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIngredients` DROP FOREIGN KEY `RecipeIngredients_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeRating` DROP FOREIGN KEY `RecipeRating_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeSteps` DROP FOREIGN KEY `RecipeSteps_recipe_id_fkey`;

-- DropTable
DROP TABLE `Ingredients`;

-- DropTable
DROP TABLE `Recipe`;

-- DropTable
DROP TABLE `RecipeCategories`;

-- DropTable
DROP TABLE `RecipeIngredients`;

-- DropTable
DROP TABLE `RecipeRating`;

-- DropTable
DROP TABLE `RecipeSteps`;

-- DropTable
DROP TABLE `RecipeTypes`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserSession`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `token` LONGTEXT NOT NULL,
    `expire_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_session_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_categories_id` INTEGER NOT NULL,
    `recipe_types_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `serves` INTEGER NOT NULL,
    `kitchen_time` VARCHAR(100) NOT NULL,
    `private` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_created` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,
    `amount` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` MEDIUMTEXT NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_created` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_recipe_categories_id_fkey` FOREIGN KEY (`recipe_categories_id`) REFERENCES `recipe_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_recipe_types_id_fkey` FOREIGN KEY (`recipe_types_id`) REFERENCES `recipe_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_steps` ADD CONSTRAINT `recipe_steps_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_rating` ADD CONSTRAINT `recipe_rating_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
