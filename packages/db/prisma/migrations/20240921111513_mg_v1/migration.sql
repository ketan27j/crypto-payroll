/*
  Warnings:

  - You are about to drop the column `number` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UseRoles" AS ENUM ('Admin', 'ClientAdmin', 'ClientUser', 'Employee');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_clientId_fkey";

-- DropIndex
DROP INDEX "Client_number_key";

-- DropIndex
DROP INDEX "User_number_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "number";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "clientId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "number",
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "role" TEXT DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
