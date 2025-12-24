-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_orderId_fkey`;

-- AlterTable
ALTER TABLE `Review` MODIFY `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
