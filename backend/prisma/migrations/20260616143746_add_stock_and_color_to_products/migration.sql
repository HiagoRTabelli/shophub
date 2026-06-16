-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
