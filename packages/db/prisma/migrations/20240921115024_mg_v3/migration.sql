/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_email_key";

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "email";
