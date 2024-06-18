/*
  Warnings:

  - Added the required column `date` to the `Duty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Duty" ADD COLUMN     "date" TEXT NOT NULL;
