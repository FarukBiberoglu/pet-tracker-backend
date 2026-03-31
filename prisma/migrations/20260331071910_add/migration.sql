/*
  Warnings:

  - The `dosageUnit` column on the `Medication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `MedicationTimes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DosageUnit" AS ENUM ('TABLET', 'ML', 'CAPSULE', 'DROP', 'INJECTION', 'OTHER');

-- DropForeignKey
ALTER TABLE "MedicationTimes" DROP CONSTRAINT "MedicationTimes_medicationId_fkey";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "dosageUnit",
ADD COLUMN     "dosageUnit" "DosageUnit";

-- DropTable
DROP TABLE "MedicationTimes";

-- CreateTable
CREATE TABLE "MedicationTime" (
    "id" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicationTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicationTime" ADD CONSTRAINT "MedicationTime_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
