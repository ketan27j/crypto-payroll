-- AlterTable
ALTER TABLE "PaymentSchedule" ADD COLUMN     "currency" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'SOL';
