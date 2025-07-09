-- DropForeignKey
ALTER TABLE "FillUp" DROP CONSTRAINT "FillUp_carId_fkey";

-- DropForeignKey
ALTER TABLE "MileageEntry" DROP CONSTRAINT "MileageEntry_carId_fkey";

-- AddForeignKey
ALTER TABLE "FillUp" ADD CONSTRAINT "FillUp_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MileageEntry" ADD CONSTRAINT "MileageEntry_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
