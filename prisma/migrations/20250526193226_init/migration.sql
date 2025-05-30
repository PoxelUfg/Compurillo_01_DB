-- CreateTable
CREATE TABLE `Sala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,
    `palabra` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jugador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `salaId` INTEGER NOT NULL,
    `anfitrion` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dibujo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagenBase64` VARCHAR(191) NOT NULL,
    `jugadorId` INTEGER NOT NULL,
    `salaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrellas` INTEGER NOT NULL,
    `dibujoId` INTEGER NOT NULL,
    `jugadorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jugador` ADD CONSTRAINT `Jugador_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `Sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dibujo` ADD CONSTRAINT `Dibujo_jugadorId_fkey` FOREIGN KEY (`jugadorId`) REFERENCES `Jugador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dibujo` ADD CONSTRAINT `Dibujo_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `Sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voto` ADD CONSTRAINT `Voto_dibujoId_fkey` FOREIGN KEY (`dibujoId`) REFERENCES `Dibujo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voto` ADD CONSTRAINT `Voto_jugadorId_fkey` FOREIGN KEY (`jugadorId`) REFERENCES `Jugador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
