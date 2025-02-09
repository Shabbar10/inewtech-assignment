-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `pinCode` INTEGER NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `gst` VARCHAR(191) NOT NULL,
    `transport` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `discount` VARCHAR(191) NOT NULL,
    `scheme` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
