/*
  Warnings:

  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropIndex
DROP INDEX "User_number_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "userId",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "PaymentSchedule" ADD COLUMN     "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdBy",
DROP COLUMN "isActive",
DROP COLUMN "number",
DROP COLUMN "role",
DROP COLUMN "wallet";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "kycok" BOOLEAN DEFAULT false,
    "role" TEXT DEFAULT 'user',
    "wallet" TEXT,
    "createdBy" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_number_key" ON "Client"("number");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
