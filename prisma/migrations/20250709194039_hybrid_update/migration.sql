/*
  Warnings:

  - You are about to drop the column `fuelType` on the `Car` table. All the data in the column will be lost.
  - Added the required column `fuelType` to the `FillUp` table without a default value. This is not possible if the table is not empty.
*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fuelType",
ADD COLUMN     "fuelTypes" "FuelType"[];

-- AlterTable: add as nullable first
ALTER TABLE "FillUp" ADD COLUMN     "fuelType" "FuelType";

-- Set default for existing rows (choose the most common, e.g. GASOLINE)
UPDATE "FillUp" SET "fuelType" = 'GASOLINE' WHERE "fuelType" IS NULL;

-- Make the column required
ALTER TABLE "FillUp" ALTER COLUMN "fuelType" SET NOT NULL;
