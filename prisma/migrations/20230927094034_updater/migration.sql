/*
  Warnings:

  - Added the required column `message` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN `message` VARCHAR(191) NOT NULL;
