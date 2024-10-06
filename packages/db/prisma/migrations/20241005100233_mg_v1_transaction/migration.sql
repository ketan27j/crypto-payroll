/*
  Warnings:

  - You are about to drop the column `isActive` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paidOn` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "isActive",
DROP COLUMN "paidOn",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "senderUserId" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
