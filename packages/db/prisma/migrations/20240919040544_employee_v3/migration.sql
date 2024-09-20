/*
  Warnings:

  - The `createdBy` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedBy` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedBy" INTEGER NOT NULL DEFAULT 1;
