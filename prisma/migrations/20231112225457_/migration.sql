-- DropIndex
DROP INDEX `user_session_token_key` ON `user_session`;

-- AlterTable
ALTER TABLE `user_session` MODIFY `token` LONGTEXT NOT NULL;
