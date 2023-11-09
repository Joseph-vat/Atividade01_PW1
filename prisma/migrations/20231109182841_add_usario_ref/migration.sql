/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Technologies` table. All the data in the column will be lost.
  - Added the required column `usuarioRef` to the `Technologies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioRef" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_usuarioRef_fkey" FOREIGN KEY ("usuarioRef") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
