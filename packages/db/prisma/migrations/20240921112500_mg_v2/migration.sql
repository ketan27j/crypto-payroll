/*
  Warnings:

  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "name";
