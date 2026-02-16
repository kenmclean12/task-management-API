/*
  Warnings:

  - Made the column `actorId` on table `ClientHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClientHistory" ALTER COLUMN "actorId" SET NOT NULL;
