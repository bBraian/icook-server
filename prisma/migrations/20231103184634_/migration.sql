-- DropIndex
DROP INDEX `UserSession_user_id_fkey` ON `UserSession`;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
